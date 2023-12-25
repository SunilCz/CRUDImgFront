import React, { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Navbar from "./components/Navbar"
import { Container } from '@mui/material'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import NotFound from './pages/NotFound'

export const AuthContext = createContext();


const App = () => {
  const [refresh, setRefresh] = useState(false)
  const [auth, setAuth] = useState(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth, refresh, setRefresh }}>
      <BrowserRouter>
        <Navbar />

        <Container sx={{ p: 1, mt: 10 }}>

          <Routes>
            {auth ?
              <>
                <Route path='/' element={<Home />} />
                <Route path='/create' element={<CreatePost />} />
                <Route path='/update/:id' element={<UpdatePost />} />
                <Route path='*' element={<NotFound/>}/>
              </>
              :
              <>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                {!localStorage.getItem("token") && <Route path='*' element={<Login/>}/>}
              </>
            }
          </Routes>

        </Container>

      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App