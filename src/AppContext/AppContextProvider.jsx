import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { createContext, useEffect } from 'react'
import { auth } from '../firebase.config';


export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

    const signUpUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)

    }

    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const appInfo = {
        signUpUser,
        signInUser
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            console.log(user);
        })
        return () => unSubscribe()
    }, [])

    return (
        <AppContext.Provider value={appInfo}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider