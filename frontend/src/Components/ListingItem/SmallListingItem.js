import React from 'react';
import styles from './SmallListingItem.module.css';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router';

export default function SmallListingItem({id, title, image}) {
    let navigate = useNavigate();

    const handleClick = () => {
        navigate(`${id}`, {replace:false});
    }

    return (
        <div className={styles.wrapper} onClick={handleClick}>
            <div className={styles.container}>
                <img src={image} className={styles.image} alt={`${title} Image`}/>
            </div>
            <div className={styles.titleContainer}>
                <p className={styles.title}>{title}</p>
            </div>
        </div>
    );
}
