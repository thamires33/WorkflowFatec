// src/components/VisualizarChamadoModalSec.js
import React, { useEffect, useState } from 'react';
import '../styles/ChamadoModal.css';

function VisualizarChamadoModalSec({ chamado, onClose, onResponder }) {
  const [resposta, setResposta] = useState('');
  const [arquivo, setArquivo] = useState(null);

  useEffect(() => {
    if (chamado) {
      document.body.classList.add('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [chamado]);

  const handleResponderClick = () => {
    if (!resposta.trim()) {
      alert('Digite uma resposta para o aluno.');
      return;
    }

    const formData = new FormData();
    formData.append('resposta', resposta);
    formData.append('mensagem', resposta); // ⚠️ campo esperado no backend
    if (arquivo) {
      formData.append('arquivo', arquivo);
    }

    onResponder(chamado.id, formData);
    onClose();
  };

  if (!chamado) return null;

  console.log('🟩 Modal está prestes a ser exibido para:', chamado);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Detalhes do Chamado</h2>

        <p><strong>Tipo:</strong> {chamado.tipo}</p>
        <p><strong>Descrição:</strong> {chamado.descricao}</p>

        {/* Renderiza condicionalmente o nome do aluno, se existir */}
        {chamado.nome_aluno && (
          <p><strong>Aluno:</strong> {chamado.nome_aluno}</p>
        )}

        {/* Renderiza condicionalmente o anexo, se existir */}
        {chamado.anexo && (
          <p>
            <strong>Anexo:</strong>{' '}
            <a
              href={`http://localhost:3000/uploads/${chamado.anexo}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visualizar
            </a>
          </p>
        )}

        <textarea
          placeholder="Digite a resposta para o aluno..."
          value={resposta}
          onChange={(e) => setResposta(e.target.value)}
        />

        <input type="file" onChange={(e) => setArquivo(e.target.files[0])} />

        <div className="modal-buttons">
          <button type="button" onClick={onClose}>Cancelar</button>
          <button type="button" onClick={handleResponderClick}>Responder</button>
        </div>
      </div>
    </div>
  );
}

export default VisualizarChamadoModalSec;
