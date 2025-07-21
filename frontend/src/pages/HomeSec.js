import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PainelColunas from '../components/PainelColunas';
import Sidebar from '../components/Sidebar';
import ChatBox from '../components/ChatBox';
import VisualizarChamadoModalSec from '../components/VisualizarChamadoModalSec';

function HomeSec() {
  const [nome, setNome] = useState('');
  const [chamadoSelecionado, setChamadoSelecionado] = useState(null);
  const navigate = useNavigate();

  // Valida login da secretaria
  useEffect(() => {
    const nomeSalvo = localStorage.getItem('nomeSecretaria');
    if (nomeSalvo) {
      setNome(nomeSalvo);
    } else {
      navigate('/LoginSecretaria');
    }
  }, [navigate]);

  // Logout da secretaria
  const handleLogout = () => {
    localStorage.removeItem('nomeSecretaria');
    navigate('/LoginSecretaria');
  };

  // Envia resposta ao aluno via backend
  const onResponderChamado = async (id, formData) => {
  try {
    formData.append('mensagem', formData.get('resposta')); // garantir campo 'mensagem'

    const response = await fetch(`http://localhost:3000/api/chamados/${id}/responder`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      alert('Resposta enviada com sucesso!');
    } else {
      alert(`Erro: ${data.message}`);
    }
  } catch (error) {
    console.error('Erro ao enviar resposta:', error);
    alert('Erro interno no servidor.');
  }
};


  // Abre o modal de visualização
  const handleVisualizarChamado = (chamado) => {
    console.log('🧩 setChamadoSelecionado acionado:', chamado);
    setChamadoSelecionado({ ...chamado }); // nova referência
  };

  return (
    <>
      <Sidebar nomeUsuario={nome} onLogout={handleLogout} />

      <div className="home-container">
        <PainelColunas
          usuario={nome}
          onVisualizarChamado={handleVisualizarChamado}
        />
        <ChatBox />
      </div>

      {/* Modal de visualização do chamado */}
      {chamadoSelecionado && (
        <VisualizarChamadoModalSec
          key={chamadoSelecionado.id}
          chamado={chamadoSelecionado}
          onClose={() => setChamadoSelecionado(null)}
          onResponder={onResponderChamado}
        />
      )}
    </>
  );
}

export default HomeSec;
