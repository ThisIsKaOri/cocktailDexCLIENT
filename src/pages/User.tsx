import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useAuth, { AuthData } from '../hooks/useAuth';
import { sign } from 'crypto';

const User = () => {

    const { user, setUser } = useAuth() as AuthData;

    const signOutHandler = () => {

        setUser({});
    }
    

    return (
        <>
            <div className="container">

                {user.token ? (
                    <div className="container" 
                        style={{
                            textAlign: "left"
                        }}
                    >

                        <h1 style={{ margin: "32px 0" }}>User</h1>
                        <p>{`Welcome to your personal area ${user.email}`}</p>
                        <nav>
                            <ul style={{display: "flex", flexDirection: "column"}}>
                                <li><Link to="/cocktails/add">Add new Cocktail</Link></li>
                                <li><Link to="/ingredients/add">Add new Ingredient</Link></li>
                                <li>
                                    <button className="outline" 
                                        onClick={signOutHandler}
                                    >Sign Out</button>
                                </li>
                            </ul>
                        </nav>

                    </div>

                ) : ( 

                    <div className="container" 
                        style={{
                            minHeight: "90vh",
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center"
                        }}
                    >
                        <hgroup>
                            <h1>Welcome to CocktailDex</h1>
                            <h2>cocktails in your pockets</h2>
                        </hgroup>

                        <button >
                            <Link to="/user/login" style={{color: "#fff"}}>Sign In</Link>
                        </button>

                        <p>or join the family</p>

                        <button className="outline">
                            <Link to="/user/register">Sign Up</Link>
                        </button>

                    </div>
                )}
                
            </div>
        </>
    )
}

export default User