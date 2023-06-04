import axios from 'axios';
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { userValidation } from '../../utils/userValidation';



const baseUrl = 'http://localhost:3000/v1/auth/signup';
//regEx per la mail: 
//inizia con una o piu lettere diverse da '@' senza spazi => /^[^\s@]
//seguite da '@' => +@
//idem => [^\s@] seguito da '.' => +\.
//finisce come la prima => [^\s@]+$/ 
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
    //utilizzo ref per gestire il focus
    const emailRef = useRef<HTMLInputElement>(null);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [pwd, setPwd] = useState('');
    //utilizzo questi state per la conferma della password
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    //utilizzo questi state per il messaggio di errore o il successo
    const [token, setToken] = useState(''); // token per la validazione
    const [serverMsg, setServerMsg] = useState('');
    const [success, setSuccess] = useState(false);

    //ogni volta che carico il component il focus si mette su email
    useEffect(() => {
        emailRef.current!.focus();
    }, []);

    //ogni volta che cambia email controllo e valido se email é valida
    useEffect(() => {
        const result = emailRegex.test(email);
        setValidEmail(result)
    }, [email]);

    //ogni volta che cambia la password o matchPwd li confronto
    useEffect(() => {
        
        const match = pwd === matchPwd
        setValidMatch(match);
    }, [pwd, matchPwd]);

    

    const submitHandler = async (event: React.SyntheticEvent) => {

        event.preventDefault();
        const newUser = {
            email: email,
            password: pwd,
        }
        try {

            const response = await axios.post(baseUrl, newUser);
            let responseToken = response.data.token;
            setToken(responseToken);
            //Yeeeeee
            setSuccess(true);
        } catch (error: any) {
            
            error.response?.status === 409 ? (
                setServerMsg("Email already taken..")
            ) : (
                setServerMsg("Something went wrong..")
            )
        }
    };

    return (
        <>
        {success ? (
            <div className="container">

                <h1 style={{ margin: "32px 0" }}>Welcome to the Family!</h1>
                <p onClick={() => {
                    userValidation(token);
                    setToken('');
                }}>{token ? 'Validate your data' : 'Thank You!'}</p>
                <span><Link to="/user/login">Sign In</Link></span>

            </div>
        ) : (
            <>
            <dialog open={serverMsg ? true : false}>
                <article style={{width: "90%"}}>
                    <h3>Ooops!</h3>
                    <p>{serverMsg}</p>
                    <footer>
                        <button className="secondary"
                        onClick={() => {
                            setServerMsg("");
                            setEmail("");
                            setPwd("");
                            setMatchPwd("");
                        }}>Dismiss</button>
                    </footer>
                  </article>
            </dialog>

            <div className="container" style={{ textAlign: "left" }}>

                <h1 style={{ margin: "32px 0" }}>Register</h1>
                <form onSubmit={submitHandler}>

                    <label htmlFor="email">Email
                        <span>
                            {emailFocus && email && !validEmail &&
                                <i className="bi bi-exclamation-circle"
                                    style={{ color: "#d81b60", margin: "10px" }}
                                > Invalid email</i>
                            }
                            {email && validEmail &&
                                <i className="bi bi-check-circle"
                                    style={{ color: "#43a047", margin: "10px" }}></i>
                            }
                        </span>
                    </label>
                    <input type="text" id="email" ref={emailRef} required
                        value={email}
                        placeholder='Enter email'
                        onChange={(event) => setEmail(event.target.value)}
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />

                    <label htmlFor="pwd">Password</label>
                    <input type="password" id="pwd" required 
                        value={pwd}
                        placeholder='Choose password'
                        onChange={(event) => setPwd(event.target.value)}
                    />

                    <label htmlFor="matchPwd">Confirm Password
                        <span>
                            {matchPwd && matchFocus && !validMatch &&
                                <i className="bi bi-exclamation-circle"
                                    style={{ color: "#d81b60", margin: "10px" }}
                                > Password don't match</i>
                            }
                            {matchPwd && validMatch &&
                                <i className="bi bi-check-circle"
                                    style={{ color: "#43a047", margin: "10px" }}></i>
                            }
                        </span>
                    </label>
                    <input type="password" id="matchPwd" required
                        value={matchPwd}
                        onChange={(event) => setMatchPwd(event.target.value)}
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />

                    <button disabled={!validEmail || !pwd || !validMatch ? true : false}
                        type="submit">Sign Up
                    </button>  

                </form>
                <div style={{
                        textAlign: "center", 
                        marginTop: "32px", 
                        borderTop: "#546e7a solid 1px",
                        paddingTop: "16px"
                    }}>
                    <p>Already registered?</p>
                    <button className="outline">
                        <Link to="/user/login">Sign In</Link>
                    </button>
                </div>
            </div>
            </>
        )}
        </>
    )
}

export default Register