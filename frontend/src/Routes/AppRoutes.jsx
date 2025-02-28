import { BrowserRouter, Routes, Route } from 'react-router-dom';

import React from 'react'
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Home from '../Screens/Home';
import Project from '../Screens/Project';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/profile" element={<div>profile</div>} />
        <Route path="/logout" element={<div>logout</div>} />
        <Route path="/project" element={<Project/>} />
      </Routes>
    </BrowserRouter>    
)
}

export default AppRoutes