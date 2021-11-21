import React from 'react'
import { IoShieldCheckmark, IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import { BsCoin } from "react-icons/bs";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './ProfileRoute.module.css';

export default function ProfileData({firstName, lastName, coinsAmount, succesfulReturns, contractsCountConsumer, contractsCountProvider}) {
    return (
        <React.Fragment>
            <h2>{firstName} {lastName}</h2>
            <Row>
                <Col sm={6} lg={12} xl={6} className={styles.colWrapperData}>
                    <BsCoin className={`${styles.coinIcon} ${styles.dataIcon}`}/> {coinsAmount}
                </Col>
                <Col sm={6} lg={12} xl={6} className={styles.colWrapperData}>
                    <IoShieldCheckmark className={styles.dataIcon}/> {succesfulReturns} succesful returns
                </Col>
                <Col sm={6} lg={12} xl={6} className={styles.colWrapperData}>
                    <IoArrowBackCircle className={styles.dataIcon}/> {contractsCountConsumer} items borrowed from others
                </Col>
                <Col sm={6} lg={12} xl={6} className={styles.colWrapperData}>
                    <IoArrowForwardCircle className={styles.dataIcon}/> {contractsCountProvider} items borrowed to others
                </Col>
            </Row>
        </React.Fragment>
    )
}
