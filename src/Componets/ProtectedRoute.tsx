import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from './context/UserauthContext';


export const ProtectedRoute = ({ children }: any) => {

    const navigate = useNavigate();

    const { user }: any = useUserAuth();

    console.log(user);

    if (!user) {
        navigate("/login")
    }


    return children
}
