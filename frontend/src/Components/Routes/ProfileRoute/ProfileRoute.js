import React,{useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';
import APIService from '../../API';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedInSelector, logIn, logOut, simpleLogIn, userIdSelector, userSelector } from '../../../slices/profileSlice';
import styles from './ProfileRoute.module.css';

import ProfileData from './ProfileData';
import TransactionsList from '../../TransactionsList/TransactionsList';
import OpenTransactionsList from '../../TransactionsList/OpenTransactionsList';

export default function ProfileRoute() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [pageLoading, setPageLoading] = useState(true);
    const [consumerTransactionsLoading, setConsumerTransactionsLoading] = useState(true);
    const [providerTransactionsLoading, setProviderTransactionsLoading] = useState(true);
    const [consumerTransactions, setConsumerTransactions] = useState([]);
    const [providerTransactions, setProviderTransactions] = useState([]);
    const [openRequests, setOpenRequests] = useState([]);

    const isAlreadyLoggedIn = useSelector(isLoggedInSelector); 
    const {
        isLoggedIn,
        userId,
        firstName,
        lastName,
        succesfulReturns,
        contractsCountConsumer,
        contractsCountProvider,
        level,
        coinsAmount,
    } = useSelector(userSelector);


    // Auth redirect
    useEffect(() => {
        if(!isAlreadyLoggedIn){
            navigate("../login", {replace: true});
        }
    }, [isAlreadyLoggedIn])

    // Fetch Profile Data
    useEffect(() => {
        if(isAlreadyLoggedIn){
            setPageLoading(true);

            APIService.GetUserProfile(userId)
                .then(data => dispatch(logIn(data)))
                .catch(error => console.log('error',error))
 
            setPageLoading(false);
        }
    }, [setPageLoading, userId, isAlreadyLoggedIn])

    // Fetch Consumer Transactions
    useEffect(() =>  {
        if(isAlreadyLoggedIn){
            setConsumerTransactionsLoading(true);

            APIService.GetUserRunningConsumerContracts(userId)
                .then(data => setConsumerTransactions(data))
                .catch(error => console.log('error',error))
 
            setConsumerTransactionsLoading(false);
        }
    }, [userId, isAlreadyLoggedIn])
    
    // Fetch Provider Transactions
    useEffect(() =>  {
        if(isAlreadyLoggedIn){
            setProviderTransactionsLoading(true);

            APIService.GetUserRunningProviderContracts(userId)
                .then(data => setProviderTransactions(data))
                .catch(error => console.log('error',error))
 
            setProviderTransactionsLoading(false);
        }
    }, [userId, isAlreadyLoggedIn])
    
    // Fetch Requests by other Consumers
    useEffect(() =>  {
        if(isAlreadyLoggedIn){
            APIService.GetRequestsMadeToUser(userId)
                .then(data => setOpenRequests(data))
                .catch(error => console.log('error',error))
        }
    }, [userId, isAlreadyLoggedIn])


    return (
        <Container className="pb-5 mb-5">
            <Row className="">
                <Col lg={6} className={styles.profileDataCol}>
                    <ProfileData firstName={firstName} lastName={lastName} coinsAmount={coinsAmount} succesfulReturns={succesfulReturns} contractsCountConsumer={contractsCountConsumer} contractsCountProvider={contractsCountProvider}/>
                </Col>
                <Col lg={6} className={styles.colWrapper}>
                    <TransactionsList profileIsConsumer={true} transactions={consumerTransactions}/>
                    <TransactionsList profileIsConsumer={false} transactions={providerTransactions}/>
                </Col>
            </Row>
            <Row>
                <OpenTransactionsList transactions={openRequests} title="Open Rent-Requests"/>
            </Row>
        </Container>
    )
}
