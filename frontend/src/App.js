import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import LoginAluno from './pages/LoginAluno';      // atualizado
import HomeAluno from './pages/HomeAluno';        // atualizado
import LoginSecretaria from './pages/LoginSecretaria';
import HomeSec from './pages/HomeSec';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/loginAluno" element={<LoginAluno />} />          {/* Rota inicial atualizada */}
        <Route path="/home" element={<HomeAluno />} />
        <Route path="/LoginSecretaria" element={<LoginSecretaria />} />
        
        <Route path="/HomeSec" element={<HomeSec />} />
      </Routes>
      <ToastContainer /> 
    </Router>
  );
}

export default App;
