import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginAluno from './pages/LoginAluno';
import HomeAluno from './pages/HomeAluno';
import LoginSecretaria from './pages/LoginSecretaria';
import HomeSec from './pages/HomeSec';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginAluno />} /> {/* rota padrão */}
        <Route path="/loginAluno" element={<LoginAluno />} />
        <Route path="/home" element={<HomeAluno />} />
        <Route path="/LoginSecretaria" element={<LoginSecretaria />} />
        <Route path="/HomeSec" element={<HomeSec />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
