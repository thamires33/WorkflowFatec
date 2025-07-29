import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import ChamadoModal from '../components/ChamadoModal';
import Sidebar from '../components/Sidebar';
import ChatBox from '../components/ChatBox';
import '../styles/Chatbox.css';

function HomeAluno() {
  const [modalAberta, setModalAberta] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const ra = localStorage.getItem('ra');
    if (!ra) {
      navigate('/login'); // redireciona para o login se não houver RA salvo
    }
  }, [navigate]);

  const handleAbrirChamado = () => {
    setModalAberta(true);
  };

  const handleFecharModal = () => {
    setModalAberta(false);
  };

  return (
    <div className="home-container">
      <Sidebar />
      <ChatBox />

      <main className="home-content">
        <h1>Bem-vindo!</h1>
        <p>Solicite aqui os documentos que precisar da secretaria acadêmica.</p>
        <button className="abrir-chamado-btn" onClick={handleAbrirChamado}>
          Abrir novo chamado
        </button>
      </main>

      <ChamadoModal isOpen={modalAberta} onClose={handleFecharModal} />
    </div>
  );
}

export default HomeAluno;
