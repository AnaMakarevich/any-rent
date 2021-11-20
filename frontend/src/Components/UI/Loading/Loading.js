import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
import styles from './Loading.module.css';

export default function Loading() {
    return (
        <Spinner className={styles.main} animation="border" role="status" size="xl">
            <span className="visually-hidden" >Loading...</span>
        </Spinner>
    )
}
