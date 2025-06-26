import React, { useState } from 'react';
import '../styles/ChamadoModal.css';

function VisualizarChamadoSec({ chamado, onClose, onResponder, onEncaminhar }) {
  const [mensagem, setMensagem] = useState('');
  const [emailDestino, setEmailDestino] = useState('');
  const [mostrarEncaminhamento, setMostrarEncaminhamento] = useState(false);
  const [anexo, setAnexo] = useState(null);

  if (!chamado) return null;

  const handleResponder = () => {
    if (!mensagem.trim()) return alert('Digite uma mensagem.');
    const form = new FormData();
    form.append('mensagem', mensagem);
    if (anexo) form.append('anexo', anexo);
    onResponder(chamado.id, form);
  };

  const handleEncaminhar = () => {
    if (!emailDestino.trim()) return alert('Insira um email para encaminhamento.');
    const form = new FormData();
    form.append('mensagem', mensagem);
    form.append('email', emailDestino);
    if (anexo) form.append('anexo', anexo);
    onEncaminhar(chamado.id, form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Chamado #{chamado.protocolo} - {chamado.tipo}</h2>
        <p><strong>Descrição:</strong> {chamado.descricao}</p>

        {chamado.anexoUrl && (
          <p>
            <strong>Anexo:</strong>{' '}
            <a href={chamado.anexoUrl} target="_blank" rel="noopener noreferrer">
              Visualizar Anexo
            </a>
          </p>
        )}

        <label>
          <strong>Anexo:</strong>
          <input type="file" onChange={(e) => setAnexo(e.target.files[0])} />
        </label>

        <textarea
          placeholder="Digite sua mensagem..."
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
        />

        {mostrarEncaminhamento && (
          <input
            type="email"
            placeholder="Email do destinatário"
            value={emailDestino}
            onChange={(e) => setEmailDestino(e.target.value)}
          />
        )}

        <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
          <button onClick={handleResponder}>Responder</button>
          <button onClick={() => setMostrarEncaminhamento(!mostrarEncaminhamento)}>
            Encaminhar
          </button>
          {mostrarEncaminhamento && (
            <button onClick={handleEncaminhar}>Enviar Encaminhamento</button>
          )}
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
}

export default VisualizarChamadoSec;
