import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ChatSec from '../components/ChatSec';
import ChatToggleButton from '../components/ChatToggleButton';
import '../styles/HomeSec.css';

function HomeSec() {
  const [showChat, setShowChat] = useState(false);
  const [chamados, setChamados] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState('');

  const toggleChat = () => setShowChat(!showChat);

  // ✅ useEffect com dependência correta
  useEffect(() => {
    const url = filtroStatus
      ? `http://localhost:3000/api/chamados/filtro/status?status=${filtroStatus}`
      : 'http://localhost:3000/api/chamados';

    fetch(url)
      .then((res) => res.json())
      .then((data) => setChamados(data))
      .catch((err) => console.error('Erro ao carregar chamados:', err));
  }, [filtroStatus]); // ✅ dispara ao trocar o status

  const getStatusClass = (status) => {
    switch (status) {
      case 'Aberto':
        return 'status aberto';
      case 'Em Análise':
        return 'status em-analise';
      case 'Fechado':
        return 'status fechado';
      default:
        return 'status';
    }
  };

  const getPrioridadeClass = (prioridade) => {
    switch (prioridade) {
      case 'Alta':
        return 'prioridade alta';
      case 'Média':
        return 'prioridade media';
      case 'Baixa':
        return 'prioridade baixa';
      default:
        return 'prioridade';
    }
  };

  return (
    <div className="home-sec-wrapper">
      <Sidebar />
      <div className="home-sec-container">
        <h1>Painel da Secretaria</h1>

        {/* ✅ Filtro de status */}
        <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
          <option value="">Todos</option>
          <option value="Aberto">Aberto</option>
          <option value="Em Análise">Em Análise</option>
          <option value="Fechado">Fechado</option>
        </select>

        <table className="chamados-table">
          <thead>
            <tr>
              <th>Protocolo</th>
              <th>Data de Abertura</th>
              <th>Tipo</th>
              <th>Prioridade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {chamados.map((ch) => (
              <tr key={ch.id}>
                <td>{ch.protocolo}</td>
                <td>{new Date(ch.data_abertura).toLocaleDateString()}</td>
                <td>{ch.tipo}</td>
                <td>
                  <span className={getPrioridadeClass(ch.prioridade)}>
                    {ch.prioridade}
                  </span>
                </td>
                <td>
                  <span className={getStatusClass(ch.status)}>{ch.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ChatToggleButton toggleChat={toggleChat} />
      {showChat && <ChatSec onClose={toggleChat} />}
    </div>
  );
}

export default HomeSec;
