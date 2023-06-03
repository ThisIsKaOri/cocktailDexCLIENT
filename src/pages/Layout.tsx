import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export const Layout = () => {
    return (
        <>
            <Outlet />
            <nav style={{
                minWidth: "100%",
                position: "fixed",
                bottom: "0",
                background: "rgba( 255, 255, 255, 0.1 )",
                boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                backdropFilter: "blur( 4px )",
                borderTop: "1px solid rgba( 255, 255, 255, 0.18 )"
            }}>
                <ul style={{
                    minWidth: "100%",
                    display: "flex",
                    justifyContent: "space-evenly",
                    fontSize: "18px"
                }}>
                    <li>
                        <Link style={{ aspectRatio: "3/1" }} to="/home">
                            <i className="bi bi-columns-gap"></i>
                        </Link>
                    </li>
                    <li>
                        <Link style={{ aspectRatio: "3/1" }} to="/cocktails">
                            <i className="bi bi-cup-straw"></i>
                        </Link>
                    </li>
                    <li>
                        <Link style={{ aspectRatio: "3/1" }} to="/ingredients">
                            <i className="bi bi-droplet"></i>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}
