import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PainelColunas from '../components/PainelColunas';
import Sidebar from '../components/Sidebar';
import ChatBox from '../components/ChatBox';
import VisualizarChamadoModalSec from '../components/VisualizarChamadoModalSec';

function HomeSec() {
  const [nome, setNome] = useState('');
  const [chamadoSelecionado, setChamadoSelecionado] = useState(null); // ⬅️ novo estado
  const navigate = useNavigate();

  useEffect(() => {
    const nomeSalvo = localStorage.getItem('nomeSecretaria');
    if (nomeSalvo) {
      setNome(nomeSalvo);
    } else {
      navigate('/LoginSecretaria');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('nomeSecretaria');
    navigate('/LoginSecretaria');
  };

  // ⬇️ função para responder chamado
  const handleResponder = async (id, resposta) => {
    try {
      const response = await fetch(`http://localhost:3000/chamados/${id}/responder`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resposta })
      });

      const data = await response.json();
      alert(data.message || 'Resposta enviada.');
      setChamadoSelecionado(null);
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar resposta.');
    }
  };

  // ⬇️ função para encaminhar chamado
  const handleEncaminhar = async (id, email) => {
    try {
      const response = await fetch(`http://localhost:3000/chamados/${id}/encaminhar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      alert(data.message || 'Chamado encaminhado.');
      setChamadoSelecionado(null);
    } catch (err) {
      console.error(err);
      alert('Erro ao encaminhar chamado.');
    }
  };

  return (
    <div>
      <Sidebar />
      <ChatBox />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
        <h2>Painel de {nome}</h2>
        <button onClick={handleLogout}>Sair</button>
      </div>

      {/* Passa função para abrir o modal no PainelColunas */}
      <PainelColunas usuario={nome} onVisualizarChamado={setChamadoSelecionado} />

      {chamadoSelecionado && (
        <VisualizarChamadoModalSec
          chamado={chamadoSelecionado}
          onClose={() => setChamadoSelecionado(null)}
          onResponder={handleResponder}
          onEncaminhar={handleEncaminhar}
        />
      )}
    </div>
  );
}

export default HomeSec;
