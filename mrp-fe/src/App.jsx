import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar/Navbar'
import Youtube from './pages/Dashboard/Youtube'
import Admin from './pages/Admin/Admin'
import Login from './pages/Auth/Login'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/consulta" element={<Youtube/>}/>
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
