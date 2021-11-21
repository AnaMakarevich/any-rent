import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import styles from './TransactionsList.module.css';
import { useNavigate } from 'react-router';
import { capitalizeString, parseDate } from '../../utils';
import {IoCalendarNumber, IoInformationCircle, IoFileTrayStacked} from 'react-icons/io5';
import APIService from '../API';
import { useSelector } from 'react-redux';
import { userIdSelector } from '../../slices/profileSlice';


const TransactionItem = ({transaction, profileIsConsumer}) => {
    const userId = useSelector(userIdSelector);
    const [showOverview, setShowOverview] = useState(false);
    const [updatedStatus, setUpdatedStatus] = useState(null);
    let navigate = useNavigate();

    const onClickViewItem = () => navigate(`../item/${transaction.item.id}`)

    const onConfirmReturn = () => {
        let body = {contract_id: transaction.id, user_id: userId}
        let action = profileIsConsumer ? "consumer_confirm_return" : "provider_confirm_return";
        APIService.UpdateContract(action, body)
            .then(data => setUpdatedStatus(data.status))
            .catch(error => console.log('error', error))
    }

    const profileAlreadyConfirmedReturn = (profileIsConsumer && transaction.consumer_confirmed_return) || (!profileIsConsumer && transaction.provider_confirmed_return);

    const returnStateFormatter = () => {
        let result;

        if(profileIsConsumer){
            if(transaction.provider_confirmed_return){
                result = "Provider confirmed Return";
            } else {
                result = "Confirmation pending";
            }
        } else {
            if(transaction.provider_confirmed_return){
                result = "Consumer confirmed Return";
            } else {
                result = "Confirmation pending";
            }
        }

        return result;
    }


    return (
        <React.Fragment>
            <a className={styles.navLink} onClick={() => setShowOverview(prev => !prev)}>{transaction.item.name}</a>
            {showOverview && (
                <div className={styles.transactionOverviewContainer}>
                    <Row className="mb-4">
                        <Col xs={6} className="d-flex align-items-center">
                            <IoInformationCircle className={styles.dataIcon}/>{returnStateFormatter()}
                        </Col>
                        <Col xs={6} className="d-flex align-items-center">
                            <IoCalendarNumber className={styles.dataIcon}/> Start {parseDate(transaction.start_date)}
                        </Col>
                        <Col xs={6} className="d-flex align-items-center">
                            <IoCalendarNumber className={styles.dataIcon}/> End {parseDate(transaction.end_date)}
                        </Col>
                        <Col xs={6} className="d-flex align-items-center">
                            <IoCalendarNumber className={styles.dataIcon}/> 
                            Status {updatedStatus ? capitalizeString(updatedStatus) : capitalizeString(transaction.status)}
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-end align-items-center">
                    <Button size="sm" variant="secondary" onClick={onClickViewItem} style={{marginRight: "0.5em"}}>View Item</Button>
                    <Button size="sm" variant="secondary" onClick={() => {}} style={{marginRight: "0.5em"}}>Upload Image</Button>
                    {!profileAlreadyConfirmedReturn && transaction.status != "completed" && <Button size="sm" onClick={onConfirmReturn}>Confirm Return</Button>}
                    </div>

                </div>
            )}
        </React.Fragment>
    );
}

export default function TransactionsList({profileIsConsumer, transactions}) {
    const type = profileIsConsumer ? "Consumer" : "Provider";

    return (
        <div className={styles.transactionListWrapper}>
            <h3 className={styles.transactionListHeader}>{type}-Transactions</h3>
            {transactions.length == 0 && <p>No Transactions found</p>}
            {transactions.length > 0 && transactions.map(item => <TransactionItem transaction={item} profileIsConsumer={profileIsConsumer}/>)}
        </div>
    )
}
