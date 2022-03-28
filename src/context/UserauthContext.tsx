import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, User, UserCredential, signOut } from 'firebase/auth';
import React, { createContext, FC, useContext, useEffect, useState } from 'react'
import { auth } from '../config/config';

type UserContextType = {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    LogIn(email: string, password: string): Promise<UserCredential>
    SignUp(email: string, password: string): Promise<UserCredential>
    LogOut(): Promise<void>
}

const UserAuthContext = createContext<UserContextType | null>(null);

export const UserauthContextProvider: FC = ({ children }) => {

    let [user, setUser] = useState<User | null>(null)

    let SignUp = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    let LogIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    let LogOut = () => {
        return signOut(auth)
    }


    useEffect(() => {
        const Unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log(currentUser);

        })

        return () => {
            Unsubscribe()
        }
    }, [])

    return <UserAuthContext.Provider value={{ user, setUser, LogIn, SignUp, LogOut }}>{children}</UserAuthContext.Provider>

}

export const useUserAuth = () => {
    return useContext(UserAuthContext)
}
