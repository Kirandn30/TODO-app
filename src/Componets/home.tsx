import { Fab } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const Home = () => {

  const navigate = useNavigate()


  let SignUp = () => {
    navigate("/signup", { replace: true })
  }

  let LogIn = () => {
    navigate("/login", { replace: true })
  }


  return (
    <div className='button'>
      <Fab onClick={SignUp} variant="extended" color="primary" aria-label="add" style={{ backgroundColor: "#96c8d1" }}>
        SignUp
      </Fab>
      <Fab onClick={LogIn} variant="extended" color="primary" aria-label="add" style={{ backgroundColor: "#96c8d1" }}>
        LogIn
      </Fab>

    </div>
  )
}
