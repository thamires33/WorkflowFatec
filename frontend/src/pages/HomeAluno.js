// src/pages/HomeAluno.js
import React, { useEffect, useState } from 'react';
import LayoutPainel from '../components/LayoutPainel';
import ChamadoModal from '../components/ChamadoModal';
import { useNavigate } from 'react-router-dom';

function HomeAluno() {
  const [nome, setNome] = useState('');
  const [modalAberta, setModalAberta] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const ra = localStorage.getItem('ra');
    if (!ra) {
      navigate('/login');
    }

    const nomeSalvo = localStorage.getItem('nomeAluno');
    if (nomeSalvo) {
      setNome(nomeSalvo);
    }
  }, [navigate]);

  const abrirChamado = () => {
    setModalAberta(true);
  };

  const fecharModal = () => {
    setModalAberta(false);
  };

  return (
    <>
      <LayoutPainel
        titulo={`Bem-vindo, ${nome}`}
        subtitulo="Use o botão abaixo para abrir um novo chamado."
        botaoTexto="Abrir Chamado"
        onBotaoClick={abrirChamado}
      >
        {/* Conteúdo adicional do painel pode ir aqui */}
      </LayoutPainel>

      <ChamadoModal isOpen={modalAberta} onClose={fecharModal} />
    </>
  );
}

export default HomeAluno;
