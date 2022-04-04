import React, { FC, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useUserAuth } from './context/UserauthContext';


export const ProtectedRoute = ({ children }: any) => {

    const navigate = useNavigate();

    const { user }: any = useUserAuth();

    let status: string | null = localStorage.getItem("user")

    //checking if user is authorized, if not redirecting back to login page


    useEffect(() => {
        if (status === "loggedOut") {

            navigate("/login")
        }
    }, [])



    return children
}
