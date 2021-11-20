import React from 'react'
import { Outlet } from 'react-router'
import NavBar from '../../NavBar/NavBar';

export default function MainRoute() {
    return (
        <React.Fragment>
            <NavBar/>
            <Outlet/>
        </React.Fragment>
    )
}
