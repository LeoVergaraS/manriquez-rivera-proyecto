import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar/Navbar'
import Consulta from './pages/Consulta'
import Youtube from './pages/Youtube'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/consulta" element={<Youtube/>}/>
      </Routes>
    </Router>
  )
}

export default App
