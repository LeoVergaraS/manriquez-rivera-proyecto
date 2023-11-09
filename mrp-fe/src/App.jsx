
import './App.css'
import Home from './pages/Home'
import Cookies from 'js-cookie';
import Login from './pages/Auth/Login'
import Admin from './pages/Admin/Admin'
import Youtube from './pages/Dashboard/Youtube'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

function App() {

  const token = Cookies.get('token')

  return (
    <Router>
      <Navbar token={token}/>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/consulta" element={token ? <Youtube/> : <Navigate to="/login" />}/>
        <Route path="/admin" element={token ? <Admin /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
