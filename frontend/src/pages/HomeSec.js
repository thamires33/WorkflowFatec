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

  // 🔐 Verifica autenticação
  useEffect(() => {
    const nomeSalvo = localStorage.getItem('nomeSecretaria');
    if (nomeSalvo) {
      setNome(nomeSalvo);
    } else {
      navigate('/LoginSecretaria');
    }
  }, [navigate]);

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem('nomeSecretaria');
    navigate('/LoginSecretaria');
  };

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
    }
  };

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

      {chamadoSelecionado && (
        <VisualizarChamadoModalSec
          chamado={chamadoSelecionado}
          onClose={() => setChamadoSelecionado(null)}
          onResponder={handleResponder}
          onEncaminhar={handleEncaminhar}
        />
      )}

      <ChatBox />
    </div>
  );
}

export default HomeSec;
