import React, { FC, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useUserAuth } from './context/UserauthContext';


export const ProtectedRoute = ({ children }: any) => {

    const navigate = useNavigate();

    const { user }: any = useUserAuth();

    let status: string | null = localStorage.getItem("user")


    useEffect(() => {
        if (status === "loggedOut") {
            console.log(status);

            navigate("/login")
        }
    }, [])



    return children
}
