import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatSec from '../components/ChatSec';
import ChatToggleButton from '../components/ChatToggleButton';
import '../styles/HomeSec.css';

function HomeSec() {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => setShowChat(!showChat);

  const chamados = [
    { protocolo: 1001, data: '20/04/2024', prioridade: 'Alta', tipo: 'Urgência de Diploma', status: 'Aberto' },
    { protocolo: 1002, data: '20/04/2024', prioridade: 'Média', tipo: 'Atestado Médico', status: 'Em análise' },
    { protocolo: 1003, data: '20/04/2024', prioridade: 'Baixa', tipo: 'Histórico Escolar', status: 'Fechado' },
    { protocolo: 1004, data: '20/04/2024', prioridade: 'Alta', tipo: 'Documentos Acadêmicos', status: 'Aberto' }
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Aberto': return 'status aberto';
      case 'Em análise': return 'status em-analise';
      case 'Fechado': return 'status fechado';
      default: return 'status';
    }
  };

  const getPrioridadeClass = (prioridade) => {
    switch (prioridade) {
      case 'Alta': return 'prioridade alta';
      case 'Média': return 'prioridade media';
      case 'Baixa': return 'prioridade baixa';
      default: return 'prioridade';
    }
  };

  return (
    <div className="home-sec-wrapper">
      <Sidebar />
      <div className="home-sec-container">
        <h1>Painel da Secretaria</h1>
        <table className="chamados-table">
          <thead>
            <tr>
              <th>Protocolo</th>
              <th>Data de abertura</th>
              <th>Prioridade</th>
              <th>Tipo de Chamado</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {chamados.map((ch) => (
              <tr key={ch.protocolo}>
                <td>{ch.protocolo}</td>
                <td>{ch.data}</td>
                <td><span className={getPrioridadeClass(ch.prioridade)}>{ch.prioridade}</span></td>
                <td>{ch.tipo}</td>
                <td><span className={getStatusClass(ch.status)}>{ch.status}</span></td>
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
