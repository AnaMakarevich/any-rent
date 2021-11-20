import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router'
import NavBar from '../../NavBar/NavBar';
import { simpleLogIn } from '../../../slices/profileSlice';
import { readUserIdLocalStorage } from '../../../utils';

export default function MainRoute() {
    const dispatch = useDispatch(true)

    // On every frontend url opening this gets executed and it checks if user id is in local storage and then pushes to redux
    useEffect(() => {
        let userId = readUserIdLocalStorage();
        if(userId){
            dispatch(simpleLogIn(userId));
        }
    }, [])

    return (
        <React.Fragment>
            <NavBar/>
            <Outlet/>
        </React.Fragment>
    )
}
