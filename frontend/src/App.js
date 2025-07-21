import React from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ModalProvider } from './components/ModalService'; // ✅ Importa o provider

import TesteModal from './pages/TesteModal';

import LoginAluno from './pages/LoginAluno';
import HomeAluno from './pages/HomeAluno';
import LoginSecretaria from './pages/LoginSecretaria';
import HomeSec from './pages/HomeSec';
import AbrirChamado from './pages/AbrirChamado';

function App() {
  return (
    <ModalProvider> {/* ✅ ENVOLVE o app com o provider */}
      <Router>
        <Routes>
          <Route path="/teste-modal" element={<TesteModal />} />
          <Route path="/" element={<Navigate to="/LoginAluno" />} />
          <Route path="/LoginAluno" element={<LoginAluno />} />
          <Route path="/LoginSecretaria" element={<LoginSecretaria />} />
          <Route path="/HomeAluno" element={<HomeAluno />} />
          <Route path="/HomeSec" element={<HomeSec />} />
          <Route path="/abrir-chamado" element={<AbrirChamado />} />
        </Routes>
        <ToastContainer />
      </Router>
    </ModalProvider>

  );
}

export default App;
