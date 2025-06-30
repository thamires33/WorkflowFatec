import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LayoutPainel.css'; // você pode criar ou complementar esse CSS aqui

function LayoutPainel({ titulo, subtitulo, botaoTexto, onBotaoClick, children }) {
  return (
    <div className="painel-container">
      <aside className="sidebar">
        <h2>Fluxo de Trabalho Fatec</h2>
        <nav className="menu-links">
          <Link to="/home">Início</Link>
          <Link to="/meus-chamados">Meus Chamados</Link>
        </nav>
        <button className="logout-btn" onClick={() => {
          localStorage.removeItem('nomeSecretaria');
          window.location.href = '/LoginSecretaria';
        }}>
          Sair
        </button>
      </aside>

      <main className="painel-conteudo">
        <h1>{titulo}</h1>
        <p>{subtitulo}</p>
        {botaoTexto && (
          <button className="botao-acao" onClick={onBotaoClick}>
            {botaoTexto}
          </button>
        )}

        <div className="conteudo-extra">
          {children}
        </div>
      </main>
    </div>
  );
}

export default LayoutPainel;
