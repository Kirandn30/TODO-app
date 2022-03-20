import './App.css';
import React, { ChangeEvent, useState, FC, useEffect } from 'react';
import { TodoTask } from './Componets/Todotask';
import {Mytask} from "./project.types"
import { Fab, FormControl, FormHelperText, Input, InputAdornment, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { stringify } from 'querystring';

const getLocalStorage=()=>{
  let todo = localStorage.getItem("TODO's")
  if(todo){
    return JSON.parse(todo)
  }else{
    return []
  }
}

let App=()=> {
  let Header:string = "TODO LIST APP"

let [task, setTask]=useState<string>("")
let [deadline, setDeadline]=useState<number>(0)
let [todo, setTodo]=useState<Mytask[]>(getLocalStorage())

let handelChange = (event:ChangeEvent<HTMLInputElement>):void =>{
   if(event.target.name==="task"){
     setTask(event.target.value)
   }else{
     setDeadline(Number(event.target.value))
   }
}

let addTask = ():void =>{
  if(task!==""){
    let newObj={taskName:task, deadline:deadline }
  setTodo([...todo, newObj])
  setTask("")
  setDeadline(0)
  }
}

let deleteTaks=(id:number)=>{
  setTodo(todo.filter((element, index)=>{
    return index!==id
  }))
}

useEffect(()=>{
 localStorage.setItem("TODO's", JSON.stringify(todo))
},[todo])

  return (
    <div className="App">
      <div className="header">
      <div className='title'>
      <h1><PlaylistAddCheckIcon style={{fontSize:"2rem"}}/> {Header}</h1>
        </div>
        <form onSubmit={(event)=>event.preventDefault()}>
        <TextField style={{width:"15rem", marginRight:"2rem", paddingBottom:"5px"}} id="standard-basic" variant="standard" name="task"  label="Todo..." onChange={handelChange} value={task} />
        <FormControl variant="standard" sx={{ m: 1, mt: 2, width: '10ch' }}>
          <Input
            id="standard-adornment-weight"
            type="number"
            value={deadline}
            onChange={handelChange}
            endAdornment={<InputAdornment position="end">Days</InputAdornment>}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
        </FormControl>

        {/* <input className='deadline' type="number" placeholder="days..." onChange={handelChange} name="days" value={deadline}/> */}
        <Fab color="primary" aria-label="add" onClick={addTask} style={{backgroundColor:"#96c8d1", marginLeft:"40px"}}>
        <AddIcon />
        </Fab>
        </form>
      </div>
      <div className="todo">
        {todo.map((element:Mytask, id:number)=>{
          return <TodoTask key={id} id={id} element={element} deleteTaks={deleteTaks}/>
        })}
      </div>
    </div>
  );
}

export default App;
