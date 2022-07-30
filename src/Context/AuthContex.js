import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';

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
    const resetPassword = async (email) => sendPasswordResetEmail(auth, email);

    const loginWithGoogle = () =>{
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleProvider)
    }


    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, currenttUser =>{
            setUser(currenttUser)
            setLoading(false)
        });
        return unsubscribe()
    }, [])


    return (
        <AuthContext.Provider value = {{signUp, login, logOut, user, loading, loginWithGoogle, resetPassword}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;