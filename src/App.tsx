import './App.css';
import React, { ChangeEvent, useState, FC, useEffect } from 'react';
import { TodoTask } from './Componets/Todotask';
import { Mytask } from "./project.types"
import { Fab, FormControl, Input, InputAdornment, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { db } from "./config/config"
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import EditIcon from '@mui/icons-material/Edit';
import { getAuth } from "firebase/auth"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Login } from './Componets/login/Login';
import SignUp from './Componets/Signup/signup';
import { Inputelements } from './Componets/inputelements';
import { UserauthContextProvider } from './context/UserauthContext';

let App = () => {

  let signup = () => {

  }


  return (
    <BrowserRouter>
      <div className="App">
        <div className='title'>
          <h1><PlaylistAddCheckIcon style={{ fontSize: "2rem" }} /> TODO LIST APP</h1>
        </div>
        <UserauthContextProvider>
          <Routes>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Inputelements />} />
          </Routes>
        </UserauthContextProvider>
      </div>
    </BrowserRouter >

  );
}

export default App;


