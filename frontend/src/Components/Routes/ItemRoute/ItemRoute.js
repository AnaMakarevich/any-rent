import APIService from '../../API';
import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router'
// Styling
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import styles from './ItemRoute.module.css'
import { BsCoin } from "react-icons/bs";
// Data
import { BACKEND_BASE_URL } from '../../../constants';
import Loading from '../../UI/Loading/Loading';
import DescriptionWrapper from '../../Descriptions/DescriptionWrapper';
import { useSelector } from 'react-redux';
import { isLoggedInSelector, userIdSelector } from '../../../slices/profileSlice';
import { parseDate, transformDateForDB } from '../../../utils';


export default function ProductRoute() {
    const userId = useSelector(userIdSelector)
    const {itemId} = useParams();
    const [item, setItem] = useState(null);
    const [loading,setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalLoading, setModalLoading] = useState(false);
    const [rentRequestPerformed, setRentRequestPerformed] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const isAlreadyLoggedIn = useSelector(isLoggedInSelector); 
    let navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        APIService.GetItem(itemId)
            .then(data => setItem(data))
            .catch(error => console.log('error',error))
        setLoading(false);
    }, [])


    const onSubmitHandler = (event) => {
        setShowModal(true);
        event.preventDefault();
    }

    const onSubmitModalMessage = () => {
        setModalLoading(true);
        APIService.PostRentRequest({uid:userId, item_id:item.id, text:modalMessage, start_date:transformDateForDB(startDate), end_date:transformDateForDB(endDate)})
            .then(data => {
                if(data.response == "OK"){
                   setRentRequestPerformed(true);
                }
            })
            .catch(error => console.log('error',error))


        setModalLoading(false);
    }

    const onCloseModal = () => setShowModal(false);
    const onOpenModal =  () => setShowModal(true);


    const modalSubmitEnabled = startDate && endDate && modalMessage && modalMessage.length > 0

    if(loading){
        return (
            <div className="d-flex justify-content-center align-items-center p-5">
                <Loading />
            </div>
        )
    }
    if(!item) return <h2></h2>

    return (
        <Container>
            <Row className={styles.container}>
                <Col className={styles.imageContainer} md={6} xl={5}>
                        <img src={BACKEND_BASE_URL + item.picture_before} className={styles.image}/>
                </Col>
                <Col md={6} xl={7} className={styles.textContainer}>
                    <div className={styles.itemHeaderContainer}>
                        <h2 className={styles.itemTitle}>{item.name}</h2>
                        <h3 className={styles.itemPrice}><BsCoin className={styles.coinIcon}/>{item.coins}</h3>
                    </div>
                    <div className={styles.actionContainer}>
                        <form onSubmit={onSubmitHandler}>
                            {isAlreadyLoggedIn && <label className={styles.rentButtonLabel}>By clicking on this button you accept the terms below.</label>}
                            {isAlreadyLoggedIn && (
                                <Button variant="primary" size="lg" className="w-100" 
                                    disabled={item.status != "available" || rentRequestPerformed} onClick={onOpenModal}
                                >
                                    Rent
                                </Button>
                            )}
                            {!isAlreadyLoggedIn && <label className={styles.rentButtonLabel}>Being a user is required to use our services.</label>}
                            {!isAlreadyLoggedIn && (
                                <Button variant="secondary" size="lg" className="w-100" 
                                    onClick={() => navigate("/login")}
                                >
                                    Log In
                                </Button>
                            )}
                        </form>
                    </div>
                </Col>
            </Row>
            <DescriptionWrapper item={item}/>


            <Modal show={showModal} onHide={onCloseModal}>
                <Modal.Header closeButton>
                <Modal.Title>Complete Renting Request</Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    {!modalLoading && !rentRequestPerformed && (
                        <Container>
                            Contact the Consumer
                            <div className="mt-2 mb-2">
                                <textarea className="form-control" value={modalMessage} onChange={(event)=>setModalMessage(event.target.value)}/>
                            </div>
                            <Row>
                                <Col sm={6} className={styles.modalInputContainer}>
                                    <label>Start</label>
                                    <input type="date" onChange={(event) => setStartDate(event.target.value)}/>
                                </Col>
                                <Col sm={6} className={styles.modalInputContainer}>
                                    <label>End</label>
                                    <input type="date" onChange={(event) => setEndDate(event.target.value)}/>
                                </Col>
                            </Row>

                        </Container>
                    )}
                    {modalLoading && (
                        <Container className="d-flex justify-content-center align-items-center">
                            <Loading />
                        </Container>
                    )}
                    {rentRequestPerformed && (
                        <Container className="d-flex justify-content-center align-items-center">
                            Sucessfully submited!
                        </Container>
                    )}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={onCloseModal}>
                    Close
                </Button>
                {!rentRequestPerformed && (
                    <Button variant="primary" onClick={onSubmitModalMessage} disabled={!modalSubmitEnabled}>
                        Submit
                    </Button>
                )}
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
