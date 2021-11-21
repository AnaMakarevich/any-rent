import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { setSingleItem } from '../../../slices/itemSlice';
import { BACKEND_BASE_URL } from '../../../constants';
import { parseDate } from '../../../utils';
import APIService from '../../API';
// Components
import Loading from '../../UI/Loading/Loading';
import Container from 'react-bootstrap/Container';
// Styles
import styles from './HomeRoute.module.css';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import { BsCoin } from "react-icons/bs";
import { useNavigate } from 'react-router';

const ListItem = ({id, image, date, coinAmount, title, description}) => {
    let navigate = useNavigate();

    const shortenDescription = () => {
        if(description && description.length > 100){
            description = description.substring(0,100) + "...";
        }
        return description;
    }



    return (
        <div className={styles.itemContainer} onClick={() => navigate(`../item/${id}`)}>
            <h5 className={styles.itemDate}>{parseDate(date)}</h5>
            <div className={styles.imageContainer}>
                <img src={BACKEND_BASE_URL + image} className={styles.itemImage}/>
            </div>
            <div className={styles.itemContentContainer}>
                <div className={styles.itemHeader}>
                    <h3 className={styles.itemTitle}>{title}</h3>
                </div>
                <p className={styles.itemDescription}>
                    {shortenDescription()}
                </p>
                <div className={styles.coinContainer}>
                    <BsCoin className={styles.coinIcon}/>
                    {coinAmount}
                </div>
            </div>
        </div>       
    );
}


export default function HomeRoute() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(()  => {
        setLoading(true);

        APIService.GetAllItems()
            .then(data => setItems(data))
            .catch(error => console.log('error',error))

        // dispatch(setSingleItem(data));
        setLoading(false);
    }, [])

    if(loading){
        return (
            <div className="d-flex align-items-center justify-content-center p-5">
                <Loading />
            </div>
        );
    }

    const displayListingComponents = () => {
        if (items && items.length > 0){
            return items.map(item => (
                <ListItem
                    id={item.id}
                    image={item.picture_before}
                    date={item.available_since}
                    coinAmount={item.coins}
                    title={item.name}
                    description={item.description}
                />
            ));
        } 

        return <h4>No Listings found</h4>

    }

    return (
        <Container className={styles.wrapper}>
                <Row>
                    <Col md={4} >
                        <div className={styles.filterContainer}>
                            <h4>Filters</h4>
                            <label>Query</label>
                            <InputGroup className="mb-3">
                                <Button variant="outline-secondary" id="button-addon1">
                                Search
                                </Button>
                                <FormControl
                                aria-label="Example text with button addon"
                                aria-describedby="basic-addon1"
                                />
                            </InputGroup>

                            <label>Sort by</label>
                            <Dropdown className="w-100">
                                <Dropdown.Toggle className="w-100" variant="secondary" id="dropdown-basic">
                                    Select Button
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="w-100">
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <label>Category</label>
                            <Dropdown className="w-100">
                                <Dropdown.Toggle className="w-100" variant="secondary" id="dropdown-basic">
                                    Select Button
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="w-100">
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Col>
                    <Col md={8}>
                        <div className={styles.allItemsContainer}>
                            {displayListingComponents()}
                        </div>
                </Col>
            </Row>
        </Container>
    )
}



