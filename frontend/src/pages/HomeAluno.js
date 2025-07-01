// src/pages/HomeAluno.js
import React, { useEffect, useState } from 'react';
import LayoutPainel from '../components/LayoutPainel';

function HomeAluno() {
  const [nome, setNome] = useState('');

  useEffect(() => {
    const nomeSalvo = localStorage.getItem('nomeAluno');
    if (nomeSalvo) {
      setNome(nomeSalvo);
    }
  }, []);

  const abrirChamado = () => {
    alert('Chamado aberto (simulação)');
  };

  return (
    <LayoutPainel
      titulo={`Bem-vindo, ${nome}`}
      subtitulo="Use o botão abaixo para abrir um novo chamado."
      botaoTexto="Abrir Chamado"
      onBotaoClick={abrirChamado}
    >
      {/* Conteúdo adicional do painel pode ir aqui */}
    </LayoutPainel>
  );
}

export default HomeAluno;
