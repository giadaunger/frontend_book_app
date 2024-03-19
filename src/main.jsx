import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './index.css'

import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PrivateRoutes from './components/PrivateRoutes';
import Contact from './pages/Contact';
import Statistics from './pages/Statistics';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Public Routes */}
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          {/* Privet Routes */}
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/statistics" element={<Statistics />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
