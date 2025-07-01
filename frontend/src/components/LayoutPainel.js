// frontend/src/components/LayoutPainel.js
import React from 'react';
import Sidebar from './Sidebar';
import '../styles/LayoutPainel.css';

function LayoutPainel({ titulo, subtitulo, botaoTexto, onBotaoClick, children }) {
  return (
    <div className="painel-container">
      <Sidebar />
      <main className="painel-conteudo">
        <h1>{titulo}</h1>
        <p>{subtitulo}</p>
        {botaoTexto && (
          <button className="botao-acao" onClick={onBotaoClick}>
            {botaoTexto}
          </button>
        )}
        <div className="conteudo-extra">{children}</div>
      </main>
    </div>
  );
}

export default LayoutPainel;
