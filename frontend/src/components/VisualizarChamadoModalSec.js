// frontend/src/components/VisualizarChamadoModalSec.jsx
import React, { useEffect, useState } from 'react';
import '../styles/ChamadoModal.css';

function VisualizarChamadoModalSec({ chamado, onClose, onResponder, onEncaminhar }) {
  const [resposta, setResposta] = useState('');
  const [arquivo, setArquivo] = useState(null);
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (chamado) {
      document.body.classList.add('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [chamado]);

  const onCloseAndClean = () => {
    setResposta('');
    setEmail('');
    setArquivo(null);
    onClose();
  };

  const handleResponderClick = async () => {
    if (!resposta.trim()) {
      alert('Digite uma resposta para o aluno.');
      return;
    }

    const formData = new FormData();
    formData.append('resposta', resposta);
    formData.append('mensagem', resposta); // compatibilidade com backend
    if (arquivo) {
      formData.append('arquivo', arquivo);
    }

    setBusy(true);
    try {
      await onResponder(chamado.id, formData);
      onCloseAndClean();
    } finally {
      setBusy(false);
    }
  };

  const handleEncaminharClick = async () => {
    if (!email.trim() || !email.includes('@')) {
      alert('Digite um e-mail válido.');
      return;
    }

    setBusy(true);
    try {
      await onEncaminhar(chamado.id, email);
      alert('Chamado encaminhado com sucesso!');
      setEmail('');
    } finally {
      setBusy(false);
    }
  };

  if (!chamado) return null;

  return (
    <div className="modal-overlay" onClick={onCloseAndClean}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Detalhes do Chamado</h2>

        <p><strong>Tipo:</strong> {chamado.tipo}</p>
        <p><strong>Descrição:</strong> {chamado.descricao}</p>
        {chamado.nome_aluno && <p><strong>Aluno:</strong> {chamado.nome_aluno}</p>}
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

        <hr />
        <label><strong>Resposta ao Aluno:</strong></label>
        <textarea
          placeholder="Digite a resposta ao aluno..."
          value={resposta}
          onChange={(e) => setResposta(e.target.value)}
          rows={4}
        />
        <input
          type="file"
          onChange={(e) => setArquivo(e.target.files[0])}
          style={{ marginTop: '10px' }}
        />
        <button onClick={handleResponderClick} disabled={busy}>
          Responder ao Aluno
        </button>

        <hr style={{ marginTop: 20 }} />
        <label><strong>Encaminhar Chamado:</strong></label>
        <input
          type="email"
          placeholder="Digite o e-mail para encaminhamento"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleEncaminharClick} disabled={busy}>
          Encaminhar por E-mail
        </button>

        <button onClick={onCloseAndClean} style={{ marginTop: 20 }}>
          Fechar
        </button>
      </div>
    </div>
  );
}

export default VisualizarChamadoModalSec;
