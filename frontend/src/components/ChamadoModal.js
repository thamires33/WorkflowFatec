import React, { useState } from 'react';
import '../styles/ChamadoModal.css';
import { toast } from 'react-toastify';

const ChamadoModal = ({ isOpen, onClose }) => {
  const [tipoChamado, setTipoChamado] = useState('');
  const [descricao, setDescricao] = useState('');
  const [anexo, setAnexo] = useState(null);

  const handleSubmit = async (e) => {
    e?.preventDefault?.();

    const aluno_ra = localStorage.getItem('ra');
    if (!aluno_ra) {
      toast.error('Usuário não autenticado');
      return;
    }

    if (!tipoChamado || !descricao) {
      toast.warning('Preencha todos os campos obrigatórios.');
      return;
    }

    const protocolo = 'CH-' + Math.floor(Math.random() * 1000000);

    const formData = new FormData();
    formData.append('protocolo', protocolo);
    formData.append('tipo', tipoChamado);
    formData.append('descricao', descricao);
    formData.append('aluno_ra', aluno_ra); // deve ser 'aluno_ra' mesmo
    if (anexo) formData.append('anexo', anexo);

    try {
      const response = await fetch('http://localhost:3000/api/chamados', {
        method: 'POST',
        body: formData,
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
  <div className="modal">
    <h2>Abrir Chamado</h2>

    <div className="form-group">
      <label>Tipo de chamado:</label>
      <select value={tipoChamado} onChange={(e) => setTipoChamado(e.target.value)}>
        <option value="">Selecione</option>
        <option value="Urgência de Diploma">Urgência de Diploma</option>
        <option value="Histórico Escolar">Histórico Escolar</option>
        <option value="Atestado Médico">Atestado Médico</option>
        <option value="Meus Documentos">Meus Documentos</option>
        <option value="Outros">Outros</option>
      </select>
    </div>

    <div className="form-group">
      <label>Descrição:</label>
      <textarea
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        placeholder="Descreva seu chamado..."
      />
    </div>

    <div className="form-group">
      <label>Anexo:</label>
      <input type="file" onChange={(e) => setAnexo(e.target.files[0])} />
    </div>

    <div className="modal-buttons">
      <button onClick={onClose}>Cancelar</button>
      <button onClick={handleSubmit}>Abrir Chamado</button>
    </div>
  </div>
</div>
 
  );
};

export default ChamadoModal;
