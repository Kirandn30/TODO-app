import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, User, UserCredential, signOut } from 'firebase/auth';
import React, { createContext, FC, useContext, useEffect, useState } from 'react'
import { auth } from '../../config/config';
import { UserContextType } from "../../project.types"

const UserAuthContext = createContext<UserContextType | null>(null);


export const UserauthContextProvider = ({ children }: any) => {

    let [user, setUser] = useState<User | null>(null)

    //signup function

    let SignUp = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //login function

    let LogIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    //logout function

    let LogOut = () => {
        return signOut(auth)
    }

    //function to know if user is loggedin or loggedout realtime

    useEffect(() => {
        const Unsubscribe = onAuthStateChanged(auth, (cred) => {
            localStorage.setItem("user", cred ? "loggedIn" : "loggedOut")
            setUser(cred)
        })

        return () => {
            Unsubscribe()
        }
    }, [])


    return (
        <UserAuthContext.Provider value={{ setUser, LogIn, SignUp, LogOut, user }}>
            {children}
        </UserAuthContext.Provider >
    )

}

//exporting hook with functions

export const useUserAuth = () => {
    return useContext(UserAuthContext)
}
