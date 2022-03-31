import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from './Componets/login/Login';
import SignUp from './Componets/Signup/signup';
import { Inputelements } from './Componets/inputelements';
import { UserauthContextProvider } from './Componets/context/UserauthContext';
import { Header } from './Componets/Header/Header';
import { ProtectedRoute } from './Componets/ProtectedRoute';
import { Home } from './Componets/home';

let App = () => {

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <UserauthContextProvider>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/todo' element={<ProtectedRoute><Inputelements /></ProtectedRoute>} />
          </Routes>
        </UserauthContextProvider>
      </div>
    </BrowserRouter >
  );
}

export default App;


