import React, {useState} from 'react'
import styles from './Descriptions.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Description, ReturnsDescription } from './Descriptions';
import {useReturnsTemplate} from '../../styling/texts';

export default function DescriptionWrapper({item}) {
    const [selectedNav, setSelectedNav] = useState("returns")
    const [shownDescription, setShownDescription] = useState('');
    const returnsTemplate = useReturnsTemplate(item.required_post_actions, item.checked_at_return);

    const getBottomNavStyle = (navName) => navName === selectedNav ? {borderBottom: "1px solid black"} : {borderBottom: "0px"}

    return (
        <Row className={styles.bottomWrapper}>
            <Col className="d-flex justify-content-center align-items-center" sm={6}>
                <p className={styles.bottomTitle} style={getBottomNavStyle("information")} onClick={() => setSelectedNav("information")}>Information</p>
            </Col>
            {/* <Col className="d-flex justify-content-center align-items-center" sm={4}>
                <p className={styles.bottomTitle} style={getBottomNavStyle("provider")} onClick={() => setSelectedNav("provider")}>Provider</p>
            </Col> */}
            <Col className="d-flex justify-content-center align-items-center" sm={6}>
                <p className={styles.bottomTitle} style={getBottomNavStyle("returns")} onClick={() => setSelectedNav("returns")}>Returns</p>
            </Col>
            <Col className="w-100">
                {selectedNav == "information" && (
                    <Description 
                        providerName={`${item.owner.first_name} ${item.owner.last_name}`}
                        condition={item.state} 
                        date={item.available_since}
                        isFragile={item.fragile}
                        text={item.description}
                    />
                )}
                {selectedNav == "returns" && (
                    <ReturnsDescription 
                        checkedAtReturn={item.checked_at_return}
                        maxRentLength={item.max_rent_length}
                        requiredPostActions={item.required_post_actions}
                        state={item.state}
                        text={returnsTemplate}
                    />
                )}
            </Col>
        </Row>
    )
}
