import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <h2 className="logo">Workflow Fatec</h2>
      <nav className="menu">
        <button className="menu-btn" onClick={() => navigate('/home')}>Início</button>
        <button className="menu-btn" onClick={() => navigate('/Chamado')}>Meus Chamados</button>
        <button className="menu-btn sair-btn" onClick={() => {
          localStorage.removeItem('nomeAluno');
          navigate('/');
        }}>
          Sair
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
