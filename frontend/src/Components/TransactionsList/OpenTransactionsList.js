import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import styles from './TransactionsList.module.css';
import { useNavigate } from 'react-router';
import { capitalizeString, parseDate } from '../../utils';
import {IoCalendarNumber, IoInformationCircle, IoFileTrayStacked, IoPersonCircle, IoShieldCheckmark, IoBan} from 'react-icons/io5';
import APIService from '../API';
import { useSelector } from 'react-redux';
import { userIdSelector } from '../../slices/profileSlice';


const OpenTransactionItem = ({transaction}) => {
    const userId = useSelector(userIdSelector);
    const [showOverview, setShowOverview] = useState(false);
    const [updatedStatus, setUpdatedStatus] = useState(null);
    const [showTransaction, setShowTransaction] = useState(true);
    let navigate = useNavigate();

    const onClickViewItem = () => navigate(`../item/${transaction.item.id}`)

    const onConfirmRequest = () => {
        let body = {user_id: userId, request_id:transaction.id}

        APIService.ConfirmRequest(body)
        .then(data => setShowTransaction(false))
        .catch(error => console.log('error',error))

    }



    if(transaction.confirmed == true || !showTransaction){
        return null
    }

    return (
        <React.Fragment>
            <a className={styles.navLink} onClick={() => setShowOverview(prev => !prev)}>{transaction.item.name}</a>
            {showOverview && (
                <div className={styles.transactionOverviewContainer}>
                    <Row className="mb-4">
                        <Col xs={6} className="d-flex align-items-center">
                            <IoPersonCircle className={styles.dataIcon}/> {transaction.consumer.first_name} {transaction.consumer.last_name}
                        </Col>
                        <Col xs={6} className="d-flex align-items-center">
                            <IoShieldCheckmark className={styles.dataIcon}/> {transaction.consumer.successful_returns} Succesful Returns
                        </Col>
                        <Col xs={6} className="d-flex align-items-center">
                            <IoBan className={styles.dataIcon}/> {transaction.consumer.successful_returns} Complains
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-end align-items-end flex-column">
                    <div className="d-flex justify-content-end align-items-center">
                        <Button variant="secondary" style={{marginRight: "0.5em"}} size="sm" onClick={onClickViewItem}>View Item</Button>
                        <Button size="sm" onClick={onConfirmRequest}>Confirm Request</Button>
                    </div>
                        <label className={styles.confirmRequestDescription}>We will share your contact data with the Consumer.</label>
                    </div>

                </div>
            )}
        </React.Fragment>
    );
}

export default function OpenTransactionsList({title, transactions}) {


    return (
        <div className={styles.transactionListWrapper}>
            <h3 className={styles.transactionListHeader}>{title}</h3>
            {!transactions || transactions.length == 0 && <p>No Pending Requests</p>}
            {transactions && transactions.length > 0 && transactions.map(item => <OpenTransactionItem transaction={item} profileIsConsumer={false}/>)}
        </div>
    )
}
