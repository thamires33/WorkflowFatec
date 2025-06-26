import React, { useState } from 'react';
import ChamadoModal from '../components/ChamadoModal';
import LayoutPainel from '../components/LayoutPainel';
import ChatBox from '../components/ChatBox';
import '../styles/Chatbox.css';

function Home() {
  const [modalAberta, setModalAberta] = useState(false);

  const handleAbrirChamado = () => {
    setModalAberta(true);
  };

  const handleFecharModal = () => {
    setModalAberta(false);
  };

  return (
    <>
      <LayoutPainel
        titulo="Bem-vindo!"
        subtitulo="Solicite aqui os documentos que você precisa da secretaria acadêmica."
        botaoTexto="Abrir novo chamado"
        onBotaoClick={handleAbrirChamado}
      >
        {/* Você pode incluir conteúdo complementar aqui, se desejar */}
        <ChatBox />
      </LayoutPainel>

      {/* Modal de abertura de chamado */}
      <ChamadoModal isOpen={modalAberta} onClose={handleFecharModal} />
    </>
  );
}

export default Home;
