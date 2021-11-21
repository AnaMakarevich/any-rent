import React, {useEffect, useState} from 'react'
import styles from './Descriptions.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {IoPersonCircle, IoToday, IoTime, IoLocationSharp, IoAccessibility, IoHandLeft, IoFitness, IoShieldCheckmark, IoWarning, IoThumbsUp} from "react-icons/io5";
import ReactMarkdown from 'react-markdown';
import {parseDate} from '../../utils';

export const Description = ({providerName, text, date, isFragile}) => {
    return (
        <div className={styles.wrapper}>
            <Row>
                <Col xs={6} md={3} className={styles.colWrapper}>
                    <IoPersonCircle className={styles.icon}/>{providerName}
                </Col>
                <Col xs={6} md={3} className={styles.colWrapper}>
                    <IoLocationSharp className={styles.icon}/>4km
                </Col>
                <Col xs={6} md={3} className={styles.colWrapper}>
                    <IoTime className={styles.icon}/>Since {parseDate(date)}
                </Col>
                <Col xs={6} md={3} className={styles.colWrapper}>
                    {isFragile && (
                        <React.Fragment>
                            <IoWarning  className={styles.icon}/>Fragile
                        </React.Fragment>
                    )}
                    {!isFragile && (
                        <React.Fragment>
                            <IoThumbsUp className={styles.icon}/>Not Fragile
                        </React.Fragment>
                    )}
                </Col>
                <Col xs={12}  className={styles.descriptionTextContainer}>
                    <ReactMarkdown>
                        {text}
                    </ReactMarkdown>
                </Col>
            </Row>
        </div>
    );
}


export const ReturnsDescription = ({checkedAtReturn, maxRentLength, requiredPostActions, state, text}) => {
    return (
        <div className={styles.wrapper}>
            <Row>
                <Col xs={6} md={3} className={styles.colWrapper}>
                    <IoAccessibility className={styles.icon}/>Control {checkedAtReturn}
                </Col>
                <Col xs={6} md={3} className={styles.colWrapper}>
                    <IoShieldCheckmark className={styles.icon}/>{requiredPostActions}
                </Col>
                <Col xs={6} md={3} className={styles.colWrapper}>
                    <IoToday className={styles.icon}/>Max. {maxRentLength} days
                </Col>
                <Col xs={6} md={3} className={styles.colWrapper}>
                    <IoFitness className={styles.icon}/>{state}
                </Col>
                <Col xs={12}  className={styles.descriptionTextContainer}>
                    <ReactMarkdown>
                        {text}
                    </ReactMarkdown>
                </Col>
            </Row>
        </div>
    );
}

