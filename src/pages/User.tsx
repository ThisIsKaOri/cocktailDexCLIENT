import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useAuth, { AuthData } from '../hooks/useAuth';

const User = () => {

    const { user, setUser } = useAuth() as AuthData;

    const signOutHandler = () => {

        setUser({});
    }


    return (
        <>
            <div className="container">

                {user.token ? (
                    <div className="container" style={{ textAlign: "left" }}>

                        <h1 style={{ margin: "32px 0" }}>User</h1>
                        <h3>Welcome back </h3>
                        <p>account:<br />{user.email}</p>
                        
                        <div style={{ textAlign: "center" }}>

                        { user.isAdmin &&
                            <>
                            <p>What are you gonna do today?</p>
                            <button className='outline'>
                                <Link to="/cocktails/add">Add new Cocktail</Link>
                            </button>
                            <button className='outline'>
                                <Link to="/ingredients/add">Add new Ingredient</Link>
                            </button>
                            <p>or</p>
                            </>
                        }
                            <button className="contrast outline"
                                onClick={signOutHandler}
                            >Sign Out</button>

                        </div>

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
                            <Link to="/user/login" style={{ color: "#fff" }}>Sign In</Link>
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