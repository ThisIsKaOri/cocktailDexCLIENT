import React, { useState } from 'react'
import LogIn from '../components/Auth/LogIn';
import Register from '../components/Auth/Register';
import { Link } from 'react-router-dom';

const User = () => {


    return (
        <>
            <nav >
                <ul style={{display: "flex", flexDirection: "column"}}>
                    <li><Link to="/user/login">Sign In</Link></li>
                    <li><Link to="/user/register">Sign Up</Link></li>
                </ul>
            </nav>

        </>
    )
}

export default User