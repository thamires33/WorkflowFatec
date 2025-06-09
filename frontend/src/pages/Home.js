import React, { useState } from 'react';
import '../styles/Home.css';
import ChamadoModal from '../components/ChamadoModal';
import Sidebar from '../components/Sidebar';
import ChatBox from '../components/ChatBox';
import '../styles/Chatbox.css'
function Home() {
  
  const [modalAberta, setModalAberta] = useState(false);

  const handleAbrirChamado = () => {
    setModalAberta(true);
  };

  const handleFecharModal = () => {
    setModalAberta(false);
  };

  return (
    <div className="home-container">
      <Sidebar/>
      <ChatBox/>

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
