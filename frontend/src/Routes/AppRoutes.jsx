import { BrowserRouter, Routes, Route } from 'react-router-dom';

import React from 'react'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>home</div>} />
        <Route path="/login" element={<div>Login</div>} />
        <Route path="/register" element={<div>Register</div>} />
        <Route path="/profile" element={<div>profile</div>} />
        <Route path="/logout" element={<div>logout</div>} />
      </Routes>
    </BrowserRouter>    
)
}

export default AppRoutes