import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ IMPORTA O HOOK
import '../styles/Home.css';
import ChamadoModal from '../components/ChamadoModal';

function Home() {
  const navigate = useNavigate(); // ✅ DEFINE O navigate
  const [modalAberta, setModalAberta] = useState(false);

  const handleAbrirChamado = () => {
    setModalAberta(true);
  };

  const handleFecharModal = () => {
    setModalAberta(false);
  };

  return (
    <div className="home-container">
      <aside className="sidebar">
        <h2 className="logo">Workflow Fatec</h2>
        <nav className="menu">
          <button className="menu-btn" onClick={() => navigate('/Home')}>Início</button>
          <button className="menu-btn" onClick={() => navigate('/Chamado')}>Meus Chamados</button>
          <button className="menu-btn">Mensagem</button>
          <button className="menu-btn sair-btn" onClick={() => navigate('/')}>Sair</button>
        </nav>
      </aside>

      <main className="home-content">
        <h1>Bem-vindo!</h1>
        <p>Solicite aqui os documentos que precisar da secretaria acadêmica.</p>
        <button className="abrir-chamado-btn" onClick={handleAbrirChamado}>
          Abrir novo chamado
        </button>
      </main>

      {/* Modal aparece aqui quando aberta */}
      <ChamadoModal isOpen={modalAberta} onClose={handleFecharModal} />
    </div>
  );
}

export default Home;
