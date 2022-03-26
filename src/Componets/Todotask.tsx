import React, { useState } from 'react'
import { Mytask } from '../project.types'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

type TodoTaskProps = {
  element: Mytask
  deleteTaks(taksIdtodelete: string): void
  editTask(taskIdtoedit: string): void
  ID: string
}

export const TodoTask = ({ element, deleteTaks, editTask, ID }: TodoTaskProps) => {

  let [done, setDone] = useState(false)

  let complete = () => {
    setDone(done ? false : true)
  }

  return (
    <div className="task">
      <div className="todo">
        <div className="pop taskName" style={{ textDecoration: done ? "line-through" : "none" }}>{element.taskName}</div>
      </div>
      <div className="day">
        <div className='pop taskDay' style={{ textDecoration: done ? "line-through" : "none" }}>{element.deadline} Days</div>
      </div>
      <div className='pop deleteIcon'>
        <CheckIcon onClick={complete} style={{ cursor: "pointer" }} />
        <EditIcon onClick={() => editTask(ID)} style={{ cursor: "pointer" }} />
        <DeleteIcon onClick={() => deleteTaks(ID)} style={{ cursor: "pointer" }} />
      </div>
    </div>
  )
}
