import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserauthContext';


export const ProtectedRoute = ({ children }: any) => {

    const navigate = useNavigate();

    const context = useUserAuth();
    if (!context) {
        return null;
    }

    const { user } = context;


    if (user == null) {
        return navigate("/login")
    }

    return children
}
