import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PainelSecretaria from '../components/PainelSecretaria';
import LayoutPainel from '../components/LayoutPainel';

function HomeSec() {
  const [nome, setNome] = useState('');
  const [chamados, setChamados] = useState([]);
  const navigate = useNavigate();

  // Verifica login
  useEffect(() => {
    const nomeSalvo = localStorage.getItem('nomeSecretaria');
    if (nomeSalvo) {
      setNome(nomeSalvo);
    } else {
      navigate('/LoginSecretaria');
    }
  }, [navigate]);

  // Carrega chamados do backend
  useEffect(() => {
    fetch('http://localhost:3000/chamados')
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Erro ${res.status}: ${text}`);
        }
        return res.json();
      })
      .then(data => setChamados(data))
      .catch(err => console.error('Erro ao carregar chamados:', err.message));
  }, []);

  const abrirPainel = () => {
    // Ação futura se quiser colocar botão extra (ex: abrir chamado manualmente)
  };

  return (
    <LayoutPainel
      titulo={`Painel de ${nome}`}
      subtitulo="Gerencie os chamados recebidos e movimente-os entre os setores."
      botaoTexto={null} // pode ser "Abrir Chamado" se desejar incluir botão
      onBotaoClick={abrirPainel}
    >
      <PainelSecretaria usuario={nome} chamados={chamados} />
    </LayoutPainel>
  );
}

export default HomeSec;
