import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatBox from '../components/ChatBox';
import { useModal } from '../components/ModalService';

import '../styles/Sidebar.css';
import '../styles/Chamado.css';
import '../styles/Chatbox.css';

function Chamado() {
  const [chamados, setChamados] = useState([]);
  const { openModal } = useModal();

  // Carregar chamados ao iniciar
  useEffect(() => {
    const aluno_ra = localStorage.getItem('aluno_ra');
    if (!aluno_ra) {
      console.error('RA do aluno não encontrado no localStorage.');
      return;
    }

    fetch(`http://localhost:3001/api/chamados/aluno?ra=${aluno_ra}`)
      .then(res => res.json())
      .then(data => setChamados(data))
      .catch(err => console.error('Erro ao buscar chamados do aluno:', err));
  }, []);

  const deletarChamado = async (id) => {
    const confirmar = window.confirm(`Tem certeza que deseja deletar o chamado ${id}?`);
    if (!confirmar) return;

    try {
      const resposta = await fetch(`http://localhost:3000/api/chamados/${id}`, {
        method: 'DELETE'
      });

      const resultado = await resposta.json();

      if (resposta.ok) {
        alert(`✅ ${resultado.mensagem}`);
        // Atualiza a lista
        const aluno_ra = localStorage.getItem('aluno_ra');
        const res = await fetch(`http://localhost:3001/api/chamados/aluno?ra=${aluno_ra}`);
        const data = await res.json();
        setChamados(data);
      } else {
        alert(`❌ Erro: ${resultado.erro}`);
      }
    } catch (erro) {
      console.error(erro);
      alert('Erro ao deletar chamado.');
    }
  };

  const handleResponderChamado = async (id, formData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/chamados/${id}/responder`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Resposta enviada com sucesso!');
        // Atualiza a lista após resposta
        const aluno_ra = localStorage.getItem('aluno_ra');
        const res = await fetch(`http://localhost:3001/api/chamados/aluno?ra=${aluno_ra}`);
        const data = await res.json();
        setChamados(data);
      } else {
        alert('Erro ao enviar resposta.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao conectar com o servidor.');
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
                  <button onClick={() => openModal(ch, handleResponderChamado)}>Visualizar</button>
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
