import React from 'react'
import Login from './Pages/Login'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Signup from './Pages/Signup'
import Profile from './Pages/Profile'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/profile' element={<Profile/>}/>

      
      <Route path='/signup' element={<Signup/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App