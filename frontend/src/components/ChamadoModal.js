import React, { useState } from 'react';
import '../styles/ChamadoModal.css';

const ChamadoModal = ({ isOpen, onClose }) => {
  const [tipoChamado, setTipoChamado] = useState('');
  const [descricao, setDescricao] = useState('');
  const [anexo, setAnexo] = useState(null);

  const handleSubmit = () => {
    console.log({ tipoChamado, descricao, anexo });
    onClose();
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
        <input type="file" onChange={(e) => setAnexo(e.target.files[0])} />

        <div className="modal-buttons">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={handleSubmit}>Abrir Chamado</button>
        </div>
      </div>
    </div>
  );
};

export default ChamadoModal;
