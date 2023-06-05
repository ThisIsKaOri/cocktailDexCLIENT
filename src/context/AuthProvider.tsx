import { Dispatch, SetStateAction, createContext, useState } from 'react';
import { UserType } from '../models/User';
import { AuthData } from '../hooks/useAuth';

//creo il context
const AuthContext = createContext({});

type ContextProps = {

    children?: string | JSX.Element | JSX.Element[];
};

//creo il provder del context
export const AuthProvider = ({ children } : ContextProps) => {

    //questo é l'utente disponibile in tutto il contesto
    const [user, setUser] = useState({});

    return (
        //il mio provider renderá disponibile l'user e il suo dispatcher
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

//esporto il contesto 
export default AuthContext;