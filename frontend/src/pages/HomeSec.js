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

<<<<<<< HEAD
  // 🔐 Verifica autenticação
=======
  // Valida login da secretaria
>>>>>>> backendra
  useEffect(() => {
    const nomeSalvo = localStorage.getItem('nomeSecretaria');
    if (nomeSalvo) {
      setNome(nomeSalvo);
    } else {
      navigate('/LoginSecretaria');
    }
  }, [navigate]);

<<<<<<< HEAD
  // 🚪 Logout
=======
  // Logout da secretaria
>>>>>>> backendra
  const handleLogout = () => {
    localStorage.removeItem('nomeSecretaria');
    navigate('/LoginSecretaria');
  };

<<<<<<< HEAD
  // 💬 Envia resposta ao aluno
  const handleResponder = async (id, resposta) => {
    try {
      const response = await fetch(`http://localhost:3000/api/chamados/${id}/responder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resposta })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      alert(data.message || 'Resposta enviada com sucesso.');
      setChamadoSelecionado(null);
    } catch (err) {
      console.error('Erro ao responder chamado:', err);
      alert('Erro ao enviar resposta ao aluno.');
=======
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
>>>>>>> backendra
    }
  } catch (error) {
    console.error('Erro ao enviar resposta:', error);
    alert('Erro interno no servidor.');
  }
};

<<<<<<< HEAD
  // 📧 Encaminha chamado por e-mail
  const handleEncaminhar = async (id, email) => {
    try {
      const response = await fetch(`http://localhost:3000/api/chamados/${id}/encaminhar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      alert(data.message || 'Chamado encaminhado com sucesso.');
      setChamadoSelecionado(null);
    } catch (err) {
      console.error('Erro ao encaminhar chamado:', err);
      alert('Erro ao encaminhar o chamado por e-mail.');
    }
  };

  return (
    <div>
      <Sidebar />
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        borderBottom: '1px solid #ccc'
      }}>
        <h2>Painel de {nome}</h2>
        <button onClick={handleLogout}>Sair</button>
      </div>

      <div style={{ padding: '0 16px' }}>
        {process.env.NODE_ENV === 'development' && (
          <button
            onClick={() =>
              setChamadoSelecionado({
                protocolo: 'TESTE123',
                tipo: 'Urgência de Diploma',
                descricao: 'Documento pendente para formatura.',
                anexo: 'https://example.com/doc.pdf'
              })
            }
          >
            MODAL DE TESTAR
          </button>
        )}
      </div>

      <PainelColunas usuario={nome} onVisualizarChamado={setChamadoSelecionado} />

=======

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
>>>>>>> backendra
      {chamadoSelecionado && (
        <VisualizarChamadoModalSec
          key={chamadoSelecionado.id}
          chamado={chamadoSelecionado}
          onClose={() => setChamadoSelecionado(null)}
          onResponder={onResponderChamado}
        />
      )}
<<<<<<< HEAD

      <ChatBox />
    </div>
=======
    </>
>>>>>>> backendra
  );
}

export default HomeSec;
