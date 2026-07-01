import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
// import Upload from './pages/Upload';
// import Analyze from './pages/Analyze';
import Optimize from './pages/Optimize';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
         {/* <Route path="/upload" element={<Upload />} />
         <Route path="/analyze" element={<Analyze />} /> */}
            <Route path="/optimize" element={<Optimize />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;