import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
// Styling
import styles from './NavBar.module.css';
import colors from '../../styling/colors';
import logo from '../../assets/logo.svg';
import {IoMenu} from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedInSelector, logOut } from '../../slices/profileSlice';

const NavLinkWrapper = () => {
    const isAlreadyLoggedIn = useSelector(isLoggedInSelector); 
    const dispatch = useDispatch();

    const onLogOut = () => dispatch(logOut());

    return (
        <React.Fragment>
            <NavLink to="/" className={styles.navLink} style={({isActive}) => ({color: isActive ? colors.primary : colors.black})}>Discover</NavLink>
            {isAlreadyLoggedIn && <NavLink to="/rent-out" className={styles.navLink} style={({isActive}) => ({color: isActive ? colors.primary : colors.black})}>Rent Out</NavLink>}
            {isAlreadyLoggedIn && <NavLink to="/profile" className={styles.navLink} style={({isActive}) => ({color: isActive ? colors.primary : colors.black})}>Profile</NavLink>}
            {isAlreadyLoggedIn && <NavLink onClick={onLogOut} to="/login" className={styles.navLink} style={({isActive}) => ({color: isActive ? colors.primary : colors.black})}>Log Out</NavLink>}
            {!isAlreadyLoggedIn && <NavLink to="/register" className={styles.navLink} style={({isActive}) => ({color: isActive ? colors.primary : colors.black})}>Register</NavLink>}
            {!isAlreadyLoggedIn && <NavLink to="/login" className={styles.navLink} style={({isActive}) => ({color: isActive ? colors.primary : colors.black})}>Log In</NavLink>}
        </React.Fragment>
    );
}



export default function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [showPhoneNav, setShowPhoneNav] = useState(false);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <img src={logo} className={styles.logo} alt="logo"/>
                <div className={styles.actionsContainer}>
                    <NavLinkWrapper />
                </div>
                <IoMenu size={25} className={styles.menuIcon} onClick={() => setShowPhoneNav(prev => !prev)}/>
            </div>
            {showPhoneNav && (
                <div className={styles.actionsContainerPhone}>
                    <NavLinkWrapper/>
                </div>
            )}
        </div>

    )
}
