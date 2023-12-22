import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase.config';
import { GoogleAuthProvider } from "firebase/auth";


export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider()


    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const signUpUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOutUser = () => {
        setLoading(true)
        setCurrentUser(null)
        return signOut(auth)
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false)
                setCurrentUser(user)
            } else {
                setLoading(false)
                setCurrentUser(null)
            }
        })
        return () => unSubscribe()
    }, [])

    const appInfo = {
        signUpUser,
        signInUser,
        loading,
        currentUser,
        logOutUser,
        googleSignIn
    }

    return (
        <AppContext.Provider value={appInfo}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider