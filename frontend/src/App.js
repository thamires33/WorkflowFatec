// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import LoginSecretaria from './pages/LoginSecretaria';
import HomeAluno from './pages/Home';
import HomeSec from './pages/HomeSec';

function App() {
  return (
    <Router>
      <Routes>
        {/* Login do aluno */}
        <Route path="/" element={<Login />} />
        
        {/* Login da secretaria */}
        <Route path="/LoginSecretaria" element={<LoginSecretaria />} />

        {/* Painel do aluno */}
        <Route path="/home" element={<HomeAluno />} />

        {/* Painel da secretaria */}
        <Route path="/HomeSec" element={<HomeSec />} />
      </Routes>
    </Router>
  );
}

export default App;
