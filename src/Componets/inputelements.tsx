import "../App.css"
import React, { ChangeEvent, useState, FC, useEffect } from 'react';
import { TodoTask } from './Todotask';
import { Mytask } from "../project.types"
import { Fab, FormControl, Input, InputAdornment, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { db } from "../config/config"
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, onSnapshot, serverTimestamp, orderBy, query } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useUserAuth } from "./context/UserauthContext"
import { useNavigate } from "react-router-dom";


export const Inputelements = () => {

    let [task, setTask] = useState<string | undefined>("")
    let [deadline, setDeadline] = useState<number | undefined>(0)
    let [todo, setTodo] = useState<Mytask[]>([])
    let [edit, setEdit] = useState(false)
    let [id, setID] = useState<string>(uuidv4())

    const navigate = useNavigate()

    //Get data from DB (Display)

    const todoCollectionRef = collection(db, "TODO")

    let Q = query(todoCollectionRef, orderBy("createdAt"))

    useEffect(() => {

        const unsub = onSnapshot(Q, (snapshot) => {
            let arr: any = []
            snapshot.docs.forEach((doc) => {
                arr.push({ ...doc.data(), id: doc.id })
            })
            setTodo(arr)

        })

        return () => {
            unsub()
        }

    }, [])



    //Get hold of values from input feild

    let handelChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.target.name === "task") {
            setTask(event.target.value)
        } else {
            setDeadline(Number(event.target.value))
        }
    }

    //Add function

    let addTask = (): void => {
        if (task !== "") {
            setID(uuidv4())
            let newObj: Mytask = { deadline: deadline, taskName: task, id: id }
            setTodo([...todo, newObj])
            setTask("")
            setDeadline(0)
            setEdit(false)
        }

        // Add data to firestore (inside Add function)

        const addTODO = async () => {
            try { task !== "" && await addDoc(todoCollectionRef, { deadline: deadline, taskName: task, createdAt: serverTimestamp() }) }
            catch (error) { console.log(error) }
        }

        addTODO()

    }


    //Delete function

    let deleteTaks = async (ID: string) => {

        //Delete data from database inside Delete function

        const docRef = doc(db, "TODO", ID)
        await deleteDoc(docRef)

        setTodo(todo.filter((element) => {
            return element.id !== ID
        }))

    }


    //edit function (displays input values)

    let editTask = async (ID: string) => {

        const selectedObj = todo.find(element => element.id === ID)
        setTask(selectedObj?.taskName)
        setDeadline(selectedObj?.deadline)
        setEdit(true)
        setID(ID)

    }

    //Edit data DB

    const editTodo = async () => {
        setTask("")
        setDeadline(0)
        setEdit(false)
        const todoDoc = doc(db, "TODO", id)
        const newUpdate = { deadline: deadline, taskName: task }

        await updateDoc(todoDoc, newUpdate)
    }

    const { LogOut, user }: any = useUserAuth();


    let logout = async () => {
        try {
            await LogOut()
            navigate("/")
            console.log(user);

        } catch (err: any) {
            console.log(err);
        }
    }


    return (
        <>
            <div className="inputs">
                <div className='logout'>
                    <Button onClick={logout} style={{ backgroundColor: "#96c8d1" }} variant="contained" endIcon={<LogoutIcon />}>
                        Log Out
                    </Button>
                </div>
                <TextField style={{ width: "15rem", marginRight: "2rem", paddingBottom: "5px" }} id="standard-basic" variant="standard" name="task" label="Todo..." onChange={handelChange} value={task} />
                <FormControl variant="standard" sx={{ m: 1, mt: 2, width: '10ch' }}>
                    <Input
                        id="standard-adornment-weight"
                        type="number"
                        value={deadline}
                        onChange={handelChange}
                        endAdornment={<InputAdornment position="end"> <AccessAlarmIcon style={{ paddingLeft: "8px" }} /></InputAdornment>}
                        aria-describedby="standard-weight-helper-text"
                        inputProps={{
                            'aria-label': 'weight',
                        }}
                    />
                </FormControl>
                {edit ? (
                    <Fab color="primary" aria-label="edit" onClick={editTodo} style={{ backgroundColor: "#96c8d1", marginLeft: "40px" }}>
                        <EditIcon />
                    </Fab>
                ) : (
                    <Fab color="primary" aria-label="add" onClick={addTask} style={{ backgroundColor: "#96c8d1", marginLeft: "40px" }}>
                        <AddIcon />
                    </Fab>
                )}
            </div>
            <div className="todo">
                {todo.map((element: Mytask, key: number) => {
                    return <TodoTask key={key} ID={element.id} element={element} deleteTaks={deleteTaks} editTask={editTask} />
                })}
            </div>
        </>

    )
}
