import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export const useAuth = () =>{
    const Context = useContext(AuthContext)
    return Context;
}


const AuthProvider = ( {children} ) => {

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true)
    
    const signUp = (email, password) => createUserWithEmailAndPassword(auth,email,password);
    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const logOut = () => signOut(auth);

    useEffect(() =>{
        onAuthStateChanged(auth, currenttUser =>{
            setUser(currenttUser)
            setLoading(false)
        })
    }, [])


    return (
        <AuthContext.Provider value = {{signUp, login, logOut, user, loading}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;