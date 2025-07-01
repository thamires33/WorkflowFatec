import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // ⬅️ adicionei Navigate
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
        <Route path="/" element={<Navigate to="/LoginAluno" />} />
        <Route path="/LoginAluno" element={<LoginAluno />} />
        <Route path="/LoginSecretaria" element={<LoginSecretaria />} />
        <Route path="/HomeAluno" element={<HomeAluno />} />
        <Route path="/HomeSec" element={<HomeSec />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
