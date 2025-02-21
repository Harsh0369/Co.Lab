import { BrowserRouter, Routes, Route } from 'react-router-dom';

import React from 'react'
import Login from '../Screens/Login';
import Register from '../Screens/Register';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>home</div>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/profile" element={<div>profile</div>} />
        <Route path="/logout" element={<div>logout</div>} />
      </Routes>
    </BrowserRouter>    
)
}

export default AppRoutes