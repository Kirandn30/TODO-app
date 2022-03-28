import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, User, UserCredential } from 'firebase/auth';
import React, { createContext, FC, useContext, useEffect, useState } from 'react'
import { auth } from '../config/config';

type UserContextType = {
    state: User | null
    setState: React.Dispatch<React.SetStateAction<User | null>>
    LogIn(email: string, password: string): Promise<UserCredential>
    SignUp(email: string, password: string): Promise<UserCredential>
}

const UserAuthContext = createContext<UserContextType | null>(null);

export const UserauthContextProvider: FC = ({ children }) => {

    let [state, setState] = useState<User | null>(null)

    let SignUp = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    let LogIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const Unsubscribe = onAuthStateChanged(auth, (currentUser) => {

            setState(currentUser)
        })

        return () => {
            Unsubscribe()
        }
    }, [])

    return <UserAuthContext.Provider value={{ state, setState, LogIn, SignUp }}>{children}</UserAuthContext.Provider>

}

export const useUserAuth = () => {
    return useContext(UserAuthContext)
}
