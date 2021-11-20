import React,{useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';
import APIService from '../../API';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedInSelector, logIn, simpleLogIn } from '../../../slices/profileSlice';

export default function LoginRoute() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const isAlreadyLoggedIn = useSelector(isLoggedInSelector); 
    // if redux user is logged in navigate to profile

    const [userId, setUserId] = useState(null);

    const onChangeUserId = (event) => setUserId(event.target.value);

    const onSubmitHandler = (event) => {
        // API CALL add later
        dispatch(simpleLogIn(userId))
        // REDUX SAVE
        event.preventDefault();
    }

    useEffect(() => {
        if(isAlreadyLoggedIn){
            navigate("../profile", {replace: true});
        }
    }, [isAlreadyLoggedIn])


    return (
        <Container className="p-5">
            <Form onSubmit={onSubmitHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>User Id</Form.Label>
                    <Form.Control type="text" placeholder="Enter User Id" value={userId} onChange={onChangeUserId}/>
                    <Form.Text className="text-muted">
                    Detailed User Authentication will be implemented later.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}
