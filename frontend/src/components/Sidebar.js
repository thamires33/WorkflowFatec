import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar() {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const nomeAluno = localStorage.getItem('alunoNome');
    const nomeSecretaria = localStorage.getItem('nomeSecretaria');

    if (location.pathname.toLowerCase().includes('homealuno')) {
      setNomeUsuario(nomeAluno || 'Aluno');
    } else if (location.pathname.toLowerCase().includes('homesec')) {
      setNomeUsuario(nomeSecretaria || 'Secretaria');
    } else {
      setNomeUsuario('');
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    if (location.pathname.toLowerCase().includes('homealuno')) {
      navigate('/LoginAluno');
    } else {
      navigate('/LoginSecretaria');
    }
  };

  return (
    <div className="sidebar">
      <h2>Workflow Fatec</h2>
      {nomeUsuario && <p className="sidebar-nome">👤 {nomeUsuario}</p>}
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}

export default Sidebar;
