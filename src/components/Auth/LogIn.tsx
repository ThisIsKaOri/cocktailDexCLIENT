import axios from 'axios';
import { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useAuth, { AuthData } from '../../hooks/useAuth';



const baseUrl = 'http://localhost:3000/v1/auth/signin';
//regEx per la mail: 
//inizia con una o piu lettere diverse da '@' senza spazi => /^[^\s@]
//seguite da '@' => +@
//idem => [^\s@] seguito da '.' => +\.
//finisce come la prima => [^\s@]+$/ 
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LogIn = () => {

    const navigate = useNavigate();
    const { user, setUser } = useAuth() as AuthData;

    //utilizzo ref per gestire il focus
    const emailRef = useRef<HTMLInputElement>(null);
    //variabili di stato
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [pwd, setPwd] = useState('');
    //utilizzo questi state per il messaggio di errore o il successo
    const [accessToken, setAccessToken] = useState('');
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

    

    const submitHandler = async (event: React.SyntheticEvent) => {

        event.preventDefault();
        const logInUser = {
            email: email,
            password: pwd,
        }
        try {

            const response = await axios.post(baseUrl, logInUser);
            const loggedUser = response.data.user;
            setUser({...loggedUser});
            setAccessToken(user.token!);
            //Yeeeeee
            navigate("/user");
        } catch (error: any) {
            console.log(error);
            if (error.response?.status === 404) {

              setServerMsg("Something went wrong..");
            } else if (error.response?.status === 403) {

              setServerMsg("Please verify your email..");
            } else if (error.response?.status === 401) {

              setServerMsg("Invalid credentials..");
            } else {
              console.log(error);
              setServerMsg(String(error))
            }
        }
    };

    return (
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
                      }}>Dismiss</button>
                  </footer>

                </article>
          </dialog>

          <div className="container" style={{ textAlign: "left" }}>

              <h1 style={{ margin: "32px 0" }}>Log In</h1>
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

                  <button disabled={!validEmail || !pwd ? true : false}
                      type="submit">Sign In
                  </button>

              </form>

              <div style={{
                        textAlign: "center", 
                        marginTop: "32px", 
                        borderTop: "#546e7a solid 1px",
                        paddingTop: "16px"
                    }}>
                    <p>Need an account?</p>
                    <button className="outline">
                        <Link to="/user/register">Sign Up</Link>
                    </button>
                </div>

          </div>
          </>
    )
}

export default LogIn