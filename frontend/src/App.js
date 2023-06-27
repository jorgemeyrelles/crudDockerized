import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Navigate to="/login" replace />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="register" element={<Register />} />
      <Route exact path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
