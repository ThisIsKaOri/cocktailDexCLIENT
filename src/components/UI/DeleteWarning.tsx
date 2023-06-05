import axios from 'axios';
import React, { useState } from 'react'
import useAuth, { AuthData } from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';

type DeleteWarningProps = {

    endpoint: string;
    name: string;
}

const DeleteWarning = ({ endpoint, name }: DeleteWarningProps) => {

    const postUrl = `${endpoint}/${name}`;
    const { user: {token}} = useAuth() as AuthData;

    const location = useLocation();
    const navigate = useNavigate();
    let successUrl = location.pathname.replace(`/${name}`, '');

    const [dismiss, setDismiss] = useState(false)
    const [success, setSuccess] = useState(false);
    const [serverMsg, setServerMsg] = useState("");


    const deleteHandler = () => {

        axios.delete(postUrl, {
            headers: {
                authorization: token
            }
        })
            .then(response => {

                console.log(response);
                setDismiss(!dismiss)
                setSuccess(true);
            })
            .catch(error => {

                console.log(error);
                if (error.status === 404) {

                    setServerMsg("Something went wrong..");
                } else if (error.status === 401) {

                    setServerMsg("User not validated..");
                } else {
                    console.log(error);
                    setServerMsg(String(error))
                }
            });
    }
    return (
        <>
        <dialog open={success ? true : false}>
                <article style={{ width: "90%" }}>
                    
                    <h3>Cocktail Deleted!</h3>
                    <p>{serverMsg}</p>
                    <footer>
                    <button className="secondary"
                            onClick={() => {
                                navigate(successUrl, {replace: true});
                            }}>Ok</button>
                    </footer>
                </article>
            </dialog>
        <dialog open={!dismiss ? true : false}>
            <article style={{ width: "90%" }}>
            
                <h3>Are you sure?</h3>

                <p>{`You're going to delete ${name}`}</p>
                <footer>
                <button className="primary"
                        onClick={() => setDismiss(!dismiss)}
                    >No</button>       
                    <button className="secondary"
                        onClick={deleteHandler}
                    >Delete</button>
                </footer>
            </article>
        </dialog>
        </>
    )
}

export default DeleteWarning