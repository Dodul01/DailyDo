import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase.config';


export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signUpUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
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
        currentUser
    }

    return (
        <AppContext.Provider value={appInfo}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider