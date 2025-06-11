import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PainelColunas from '../components/PainelColunas';
import Sidebar from '../components/Sidebar';
import ChatBox from '../components/ChatBox';

function HomeSec() {
  const [nome, setNome] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const nomeSalvo = localStorage.getItem('nomeSecretaria');
    if (nomeSalvo) {
      setNome(nomeSalvo);
    } else {
      navigate('/LoginSecretaria'); // redireciona se não estiver logado
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('nomeSecretaria');
    navigate('/LoginSecretaria');
  };

  return (
    <div>
    <Sidebar />
      <ChatBox />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
        <h2>Painel de {nome}</h2>
        <button onClick={handleLogout}>Sair</button>
      </div>
      <PainelColunas usuario={nome} />
    </div>
  );
}

export default HomeSec;
