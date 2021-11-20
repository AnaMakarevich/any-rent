import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { findProduct } from '../../data/products';
// Styling
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import styles from './ProductRoute.module.css'
// Data
import { returns, description, ratings } from '../../data/texts';

export default function ProductRoute() {
    const [selectedNav, setSelectedNav] = useState("material")

    let params = useParams();
    const product = findProduct(parseInt(params.productId));


    if(!product) return <h2>Product not found</h2>

    const getBottomNavStyle = (navName) => navName === selectedNav ? {borderBottom: "1px solid black"} : {borderBottom: "0px"}

    return (
        <Container>
            <Row className={styles.container}>
                <Col className={styles.imageContainer} md={6} xl={5}>
                        <img src={product.image} className={styles.image}/>
                </Col>
                <Col md={6} xl={7} className={styles.textContainer}>
                    <div className={styles.itemHeaderContainer}>
                        <h2 className={styles.itemTitle}>Air Jordan 1 Hi OG Shattered Backboard</h2>
                        <h3 className={styles.itemPrice}>$354.99</h3>
                    </div>
                    <div className={styles.actionContainer}>
                        <form>
                            <select id="cars" name="cars" className={styles.dropdown}>
                                <option value="volvo">40</option>
                                <option value="saab">40,5</option>
                                <option value="fiat">41</option>
                                <option value="audi">44,5</option>
                            </select>
                            <button className={styles.buyButton}>Kaufen</button>
                        </form>
                    </div>
                </Col>
            </Row>
            <Row className={styles.bottomWrapper}>
                <Col className="d-flex justify-content-center align-items-center" sm={4}>
                    <p className={styles.bottomTitle} style={getBottomNavStyle("material")} onClick={() => setSelectedNav("material")}>Material & Pflege</p>
                </Col>
                <Col className="d-flex justify-content-center align-items-center" sm={4}>
                    <p className={styles.bottomTitle} style={getBottomNavStyle("bewertung")} onClick={() => setSelectedNav("bewertung")}>Bewertung</p>
                </Col>
                <Col className="d-flex justify-content-center align-items-center" sm={4}>
                    <p className={styles.bottomTitle} style={getBottomNavStyle("rueckgabe")} onClick={() => setSelectedNav("rueckgabe")}>Rückgabe</p>
                </Col>
            </Row>
            <div>
                <p>
                    {selectedNav == "material" && description}
                    {selectedNav == "bewertung" && ratings}
                    {selectedNav == "rueckgabe" && returns}
                </p>
            </div>
        </Container>
    )
}
