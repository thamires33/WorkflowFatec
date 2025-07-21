// src/pages/HomeAluno.js
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChamadoModal from '../components/ChamadoModal';
import ChatBox from '../components/ChatBox';
import { useNavigate } from 'react-router-dom';

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
      <Sidebar nomeUsuario={nomeAluno} />

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

      {modalAberta && <ChamadoModal isOpen={modalAberta} onClose={fecharModal} />}
    </div>
  );
}

export default HomeAluno;
