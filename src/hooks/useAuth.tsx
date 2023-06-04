import { Dispatch, SetStateAction, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { UserType } from "../models/User";

//fondamentalmente questo hook mi serve per usare il context
//evocandolo con dentro i valori del Context che mi interessano
//senza importare useContext, AuthContext e settare le variabili
//dentro ogni file

export type AuthData = {

    user: UserType;
    setUser: Dispatch<SetStateAction<{}>>;
}

const useAuth = () => {

    return useContext(AuthContext);
};

export default useAuth;