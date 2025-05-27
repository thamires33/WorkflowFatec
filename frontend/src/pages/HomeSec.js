import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ChatSec from '../components/ChatSec';
import ChatToggleButton from '../components/ChatToggleButton';
import '../styles/HomeSec.css';

function HomeSec() {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => setShowChat(!showChat);

  const [chamados, setChamados] = useState([]);

useEffect(() => {
  fetch('http://localhost:3001/api/chamados') // ajuste a URL conforme seu back-end
    .then(response => response.json())
    .then(data => setChamados(data))
    .catch(error => console.error('Erro ao buscar chamados:', error));
}, []);


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

  const visualizarChamado = (protocolo) => {
  alert(`Chamado ${protocolo} selecionado para visualização`);
};

const encerrarChamado = async (protocolo) => {
  const confirmacao = window.confirm(`Deseja encerrar o chamado ${protocolo}?`);
  if (!confirmacao) return;

  try {
    const response = await fetch(`http://localhost:3001/api/chamado/${protocolo}/encerrar`, {
      method: 'PUT',
    });
    if (response.ok) {
      alert('Chamado encerrado com sucesso!');
      setChamados((prev) =>
        prev.map((c) =>
          c.protocolo === protocolo ? { ...c, status: 'Fechado' } : c
        )
      );
    } else {
      alert('Erro ao encerrar o chamado');
    }
  } catch (error) {
    console.error('Erro ao encerrar chamado:', error);
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
              <th>Ações</th>

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
      <td>
        <button onClick={() => visualizarChamado(ch.protocolo)}>Visualizar</button>
        <button onClick={() => encerrarChamado(ch.protocolo)}>Encerrar</button>
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
