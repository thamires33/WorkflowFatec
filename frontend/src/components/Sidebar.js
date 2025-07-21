import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar({ nomeUsuario, isAluno }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (isAluno) {
      localStorage.removeItem('nomeAluno');
      localStorage.removeItem('alunoNome');
      localStorage.removeItem('ra');
      navigate('/LoginAluno'); // ← corrigido para rota correta
    } else {
      localStorage.removeItem('nomeSecretaria');
      navigate('/LoginSecretaria');
    }
  };

  return (
    <aside className="sidebar">
      <h2 className="logo">Workflow Fatec</h2>

      {nomeUsuario && <p className="sidebar-nome">👤 {nomeUsuario}</p>}

      <nav className="menu">
        {isAluno ? (
          <>
            <button className="menu-btn" onClick={() => navigate('/HomeAluno')}>Início</button>
            <button className="menu-btn" onClick={() => navigate('/Chamado')}>Meus Chamados</button>
          </>
        ) : (
          <button className="menu-btn" onClick={() => navigate('/HomeSec')}>Painel</button>
        )}

        <button className="menu-btn sair-btn" onClick={handleLogout}>
          Sair
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
