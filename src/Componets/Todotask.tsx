import { Button, Fab } from '@mui/material'
import React from 'react'
import { Mytask } from '../project.types'
import DeleteIcon from '@mui/icons-material/Delete';

type TodoTaskProps={
    element:Mytask
    key:number
    deleteTaks(taksIdtodelete:number):void
    id: number
}

export const TodoTask = ({element, id, deleteTaks}:TodoTaskProps) => {
  return (
      <div className="task">
          <div className="content">
          <span>{element.taskName}</span>
          <span>{element.deadline} Days</span>
          </div>
            <DeleteIcon onClick={()=>deleteTaks(id)} style={{color:"black", paddingTop:"10px", cursor: "pointer", marginRight:"2rem"}}/>
      </div>
  )
}
