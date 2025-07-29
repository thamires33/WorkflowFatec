import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

<<<<<<< HEAD
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import LoginAluno from './pages/LoginAluno';      // atualizado
import HomeAluno from './pages/HomeAluno';        // atualizado
=======
<<<<<<< Updated upstream
import Login from './pages/Login';
=======
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginAluno from './pages/LoginAluno';      
import HomeAluno from './pages/HomeAluno';        
>>>>>>> Stashed changes
>>>>>>> rafront
import LoginSecretaria from './pages/LoginSecretaria';
import HomeSec from './pages/HomeSec';

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/loginAluno" element={<LoginAluno />} />          {/* Rota inicial atualizada */}
        <Route path="/home" element={<HomeAluno />} />
        <Route path="/LoginSecretaria" element={<LoginSecretaria />} />
        
=======
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
>>>>>>> rafront
        <Route path="/HomeSec" element={<HomeSec />} />
      </Routes>
      <ToastContainer /> 
    </Router>
  );
}

export default App;
