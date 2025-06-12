import React, { useState } from 'react';
import '../styles/ChamadoModal.css';

function VisualizarChamadoSec({ chamado, onClose, onResponder, onEncaminhar, onEncerrar }) {
  const [mensagem, setMensagem] = useState('');
  const [emailEncaminhamento, setEmailEncaminhamento] = useState('');
  const [modo, setModo] = useState(null); // 'responder' ou 'encaminhar'
  const [anexo, setAnexo] = useState(null);

  const handleResponder = () => {
    if (mensagem.trim() === '') return alert('Digite uma mensagem para responder.');
    onResponder(chamado.id, mensagem);
    setMensagem('');
    setModo(null);
  };

  const handleEncaminhar = () => {
    if (emailEncaminhamento.trim() === '') return alert('Digite o email para encaminhamento.');
    onEncaminhar(chamado.id, emailEncaminhamento, mensagem);
    setEmailEncaminhamento('');
    setMensagem('');
    setModo(null);
  };

  const handleEncerrar = () => {
    onEncerrar(chamado.id);
  };

  const handleAnexoChange = (e) => {
    setAnexo(e.target.files[0]);
  };

  if (!chamado) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Chamado #{chamado.protocolo} - {chamado.tipo}</h2>
        <p><strong>Data de Abertura:</strong> {chamado.data}</p>
        <p><strong>Status:</strong> {chamado.status}</p>
        <p><strong>Descrição:</strong> {chamado.descricao}</p>

        {chamado.anexoUrl && (
          <p>
            <strong>Anexo:</strong>{' '}
            <a href={chamado.anexoUrl} target="_blank" rel="noopener noreferrer">Visualizar Anexo</a>
          </p>
        )}

        <div className="botoes-modal">
          <button onClick={() => setModo('responder')}>Responder</button>
          <button onClick={() => setModo('encaminhar')}>Encaminhar</button>
          <button onClick={handleEncerrar}>Encerrar</button>
          <button onClick={onClose}>Fechar</button>
        </div>

        {modo && (
          <div className="form-resposta">
            {modo === 'encaminhar' && (
              <input
                type="email"
                placeholder="Email para encaminhar"
                value={emailEncaminhamento}
                onChange={(e) => setEmailEncaminhamento(e.target.value)}
              />
            )}

            <textarea
              placeholder="Digite a mensagem"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
            />

            <input
              type="file"
              onChange={handleAnexoChange}
            />

            <button onClick={modo === 'responder' ? handleResponder : handleEncaminhar}>
              {modo === 'responder' ? 'Enviar Resposta' : 'Enviar Encaminhamento'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default VisualizarChamadoSec;
