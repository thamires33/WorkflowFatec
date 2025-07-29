// frontend/src/components/VisualizarChamadoModalSec.jsx
import React, { useState } from 'react';
import '../styles/Chamado.css';

export default function VisualizarChamadoModalSec({
  chamado,
  onClose,
  onResponder,
  onEncaminhar,
}) {
  const [resposta, setResposta] = useState('');
  const [email, setEmail]       = useState('');
  const [busy, setBusy]         = useState(false); // controla loading

  /* ---------- handlers ---------------------------------------------- */
  async function handleResponderClick() {
    if (!resposta.trim()) return alert('Digite uma resposta para o aluno.');
    setBusy(true);
    try {
      await onResponder(chamado.id, resposta);
      onCloseAndClean();
    } finally {
      setBusy(false);
    }
  }

  async function handleEncaminharClick() {
    if (!email.trim() || !email.includes('@'))
      return alert('Digite um e-mail válido.');
    setBusy(true);
    try {
      await onEncaminhar(chamado.id, email);
      setEmail('');
      alert('Encaminhado com sucesso!');
    } finally {
      setBusy(false);
    }
  }

  /* ---------- helpers ----------------------------------------------- */
  function onCloseAndClean() {
    setResposta('');
    setEmail('');
    onClose();
  }

  /* ---------- UI ----------------------------------------------------- */
  return (
    <div className="modal-overlay" onClick={onCloseAndClean}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // impede fechar se clicar dentro
      >
        <h2>Chamado # {chamado?.protocolo}</h2>

        <p>
          <strong>Tipo:</strong> {chamado?.tipo}
        </p>
        <p>
          <strong>Descrição:</strong> {chamado?.descricao}
        </p>

        {chamado?.anexo && (
          <p>
            <strong>Anexo:</strong>{' '}
            <a
              href={chamado.anexo}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visualizar Documento
            </a>
          </p>
        )}

        <hr />

        <label>
          <strong>Resposta ao Aluno:</strong>
        </label>
        <textarea
          placeholder="Digite a resposta ao aluno..."
          value={resposta}
          onChange={(e) => setResposta(e.target.value)}
          rows={4}
          style={{ width: '100%', marginTop: 8 }}
        />
        <button
          onClick={handleResponderClick}
          disabled={busy}
          style={{ marginTop: 10 }}
        >
          Responder ao Aluno
        </button>

        <hr style={{ marginTop: 20 }} />

        <label>
          <strong>Encaminhar Chamado:</strong>
        </label>
        <input
          type="email"
          placeholder="Digite o e-mail para encaminhamento"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', marginTop: 8 }}
        />
        <button
          onClick={handleEncaminharClick}
          disabled={busy}
          style={{ marginTop: 10 }}
        >
          Encaminhar por E-mail
        </button>

        <button
          onClick={onCloseAndClean}
          style={{ marginTop: 20, backgroundColor: '#888' }}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
