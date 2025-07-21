import React, { useState } from 'react';
import '../styles/ChamadoModal.css';

function TesteModal() {
  const [modalAberto, setModalAberto] = useState(false);

  const chamadoSimulado = {
    id: 999,
    tipo: 'Histórico Escolar',
    descricao: 'Solicito o histórico completo para transferência.',
    nome_aluno: 'João da Silva',
    anexo: 'exemplo.pdf'
  };

  return (
    <div className="content">
      <h2>Teste de Modal Isolado</h2>
      <button onClick={() => setModalAberto(true)}>Abrir Modal</button>

      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Detalhes do Chamado</h2>

            <p><strong>Tipo:</strong> {chamadoSimulado.tipo}</p>
            <p><strong>Descrição:</strong> {chamadoSimulado.descricao}</p>
            <p><strong>Aluno:</strong> {chamadoSimulado.nome_aluno}</p>

            <p>
              <strong>Anexo:</strong>{' '}
              <a
                href={`http://localhost:3000/uploads/${chamadoSimulado.anexo}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visualizar
              </a>
            </p>

            <textarea placeholder="Digite uma resposta..." />
            <input type="file" />

            <div className="modal-buttons">
              <button onClick={() => setModalAberto(false)}>Fechar</button>
              <button>Responder</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TesteModal;
