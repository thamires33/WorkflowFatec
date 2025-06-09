import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PainelSecretaria from '../components/PainelSecretaria';

function HomeSec() {
  const [nome, setNome] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const nomeSalvo = localStorage.getItem('nomeSecretaria');
    if (nomeSalvo) {
      setNome(nomeSalvo);
    } else {
      // Redireciona se não estiver logado
      navigate('/LoginSecretaria');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('nomeSecretaria'); // Limpa o nome
    navigate('/LoginSecretaria');             // Redireciona para login
  };

  return (
    <div className="home-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Painel de {nome}</h2>
        <button onClick={handleLogout} style={{ padding: '8px 12px' }}>
          Sair
        </button>
      </div>
      <PainelSecretaria usuario={nome} />
    </div>
  );
}

export default HomeSec;
