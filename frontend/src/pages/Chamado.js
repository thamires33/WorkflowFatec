import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatBox from '../components/ChatBox';
import '../styles/Sidebar.css';
import '../styles/Chamado.css';
import '../styles/Chatbox.css';

function Chamado() {
  const [chamados, setChamados] = useState([]);

  // 1. Buscar chamados da API ao carregar
  useEffect(() => {
    buscarChamados();
  }, []);

  const buscarChamados = async () => {
    try {
      const resposta = await fetch('http://localhost:3000/api/chamados');
      const dados = await resposta.json();
      setChamados(dados);
    } catch (erro) {
      alert('Erro ao buscar chamados.');
      console.error(erro);
    }
  };

  // 2. Deletar chamado por ID
  const deletarChamado = async (id) => {
    const confirmacao = window.confirm(`Tem certeza que deseja deletar o chamado ${id}?`);

    if (!confirmacao) return;

    try {
      const resposta = await fetch(`http://localhost:3000/api/chamados/${id}`, {
        method: 'DELETE'
      });

      const resultado = await resposta.json();

      if (resposta.ok) {
        alert(`✅ ${resultado.mensagem}`);
        buscarChamados(); // Atualiza lista após deletar
      } else {
        alert(`❌ Erro: ${resultado.erro}`);
      }
    } catch (erro) {
      console.error(erro);
      alert('❌ Erro ao deletar chamado.');
    }
  };

  return (
    <div className="home-container">
      <Sidebar />
      <ChatBox />
      <div className="content">
        <h2>Meus Chamados</h2>
        <table>
          <thead>
            <tr>
              <th>Protocolo</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Tipo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {chamados.map((ch) => (
              <tr key={ch.id}>
                <td>{ch.protocolo}</td>
                <td>{new Date(ch.data_criacao).toLocaleDateString()}</td>
                <td>{new Date(ch.data_criacao).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                <td>{ch.tipo}</td>
                <td>
                  <button onClick={() => alert(`Chamado ${ch.protocolo}`)}>Visualizar</button>
                  <button onClick={() => deletarChamado(ch.id)} style={{ marginLeft: '8px', color: 'red' }}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Chamado;
