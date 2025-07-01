import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import ChamadoModal from '../components/ChamadoModal';
import Sidebar from '../components/Sidebar';
import ChatBox from '../components/ChatBox';
import '../styles/Chatbox.css';

function HomeAluno() {
  const [modalAberta, setModalAberta] = useState(false);
  const [nomeAluno, setNomeAluno] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const ra = localStorage.getItem('ra');
    const nome = localStorage.getItem('alunoNome');

    if (!ra) {
      navigate('/LoginAluno');
    } else {
      setNomeAluno(nome || '');
    }
  }, [navigate]);

  const abrirChamado = () => setModalAberta(true);
  const fecharModal = () => setModalAberta(false);

  return (
    <div className="home-wrapper">
      <Sidebar />

      <div className="home-container">
        <main className="home-content">
          <h1>Bem-vindo(a), {nomeAluno}!</h1>
          <p>Solicite aqui os documentos que precisar da secretaria acadêmica.</p>
          <button className="abrir-chamado-btn" onClick={abrirChamado}>
            Abrir novo chamado
          </button>
        </main>

        <ChatBox />
      </div>

      <ChamadoModal isOpen={modalAberta} onClose={fecharModal} />
    </div>
  );
}

export default HomeAluno;
