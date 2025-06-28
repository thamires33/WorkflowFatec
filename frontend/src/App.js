// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

<<<<<<< Updated upstream
import Login from './pages/Login';
=======
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginAluno from './pages/LoginAluno';      
import HomeAluno from './pages/HomeAluno';        
>>>>>>> Stashed changes
import LoginSecretaria from './pages/LoginSecretaria';
import HomeAluno from './pages/Home';
import HomeSec from './pages/HomeSec';

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< Updated upstream
        {/* Login do aluno */}
        <Route path="/" element={<Login />} />
        
        {/* Login da secretaria */}
        <Route path="/LoginSecretaria" element={<LoginSecretaria />} />

        {/* Painel do aluno */}
        <Route path="/home" element={<HomeAluno />} />

        {/* Painel da secretaria */}
=======
        <Route path="/" element={<LoginAluno />} /> {/* ← rota padrão corrigida */}
        <Route path="/loginAluno" element={<LoginAluno />} />
        <Route path="/home" element={<HomeAluno />} />
        <Route path="/LoginSecretaria" element={<LoginSecretaria />} />
>>>>>>> Stashed changes
        <Route path="/HomeSec" element={<HomeSec />} />
      </Routes>
    </Router>
  );
}

export default App;
