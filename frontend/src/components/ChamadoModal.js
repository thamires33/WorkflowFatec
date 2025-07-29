import React, { useState } from 'react';
import '../styles/ChamadoModal.css';
import { toast } from 'react-toastify';

const ChamadoModal = ({ isOpen, onClose }) => {
  const [tipoChamado, setTipoChamado] = useState('');
  const [descricao, setDescricao] = useState('');
  //const [anexo, setAnexo] = useState(null);

  const handleSubmit = async () => {
    const id_aluno = localStorage.getItem('idAluno');
    if (!id_aluno) {
      toast.error('Usuário não autenticado');
      return;
    }

    if (!tipoChamado || !descricao) {
      toast.warning('Preencha todos os campos obrigatórios.');
      return;
    }

    const protocolo = 'CH-' + Math.floor(Math.random() * 1000000);

    const chamado = {
      protocolo,
      tipo: tipoChamado,
      descricao,
      id_aluno
    };

    try {
      const response = await fetch('http://localhost:3000/chamados', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(chamado)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Chamado criado com sucesso!');
        onClose();
      } else {
        toast.error(data.message || 'Erro ao criar chamado');
      }
    } catch (err) {
      console.error(err);
      toast.error('Erro ao conectar com o servidor.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Abrir Chamado</h2>

        <label>Tipo de chamado:</label>
        <select value={tipoChamado} onChange={(e) => setTipoChamado(e.target.value)}>
          <option value="">Selecione</option>
          <option value="Urgencia de Diploma">Urgência de Diploma</option>
          <option value="Historico Escolar">Histórico Escolar</option>
          <option value="Atestado Médico">Atestado Médico</option>
          <option value="Meus Documentos">Meus Documentos</option>
          <option value="Outros">Outros</option>
        </select>

        <label>Descrição:</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descreva seu chamado..."
        />

        <label>Anexo:</label>
        {/*<input type="file" onChange={(e) => setAnexo(e.target.files[0])} />*/}

        <div className="modal-buttons">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={handleSubmit}>Abrir Chamado</button>
        </div>
      </div>
    </div>
  );
};

export default ChamadoModal;
