import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
// Styling
import styles from './NavBar.module.css';
import colors from '../../styling/colors';
import logo from '../../assets/logo.svg';
import {IoMenu} from 'react-icons/io5'


const NavLinkWrapper = () => {
    return (
        <React.Fragment>
            <NavLink to="/" className={styles.navLink} style={({isActive}) => ({color: isActive ? colors.primary : colors.black})}>Discover</NavLink>
            <NavLink to="/rent-out" className={styles.navLink} style={({isActive}) => ({color: isActive ? colors.primary : colors.black})}>Rent Out</NavLink>
            <NavLink to="/profile" className={styles.navLink} style={({isActive}) => ({color: isActive ? colors.primary : colors.black})}>Profile</NavLink>
    </React.Fragment>
    );
}



export default function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [showPhoneNav, setShowPhoneNav] = useState(false);

    return (
        <React.Fragment>
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
        </React.Fragment>

    )
}
