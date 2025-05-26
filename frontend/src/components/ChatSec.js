import React from 'react';
import conversas from './conversasMock';
import '../styles/Chat.css';

function ChatSec({ onClose }) {
  return (
    <div className="chat-box">
      <div className="chat-header">
        <h3>Conversas com Alunos</h3>
        <button onClick={onClose}>✖</button>
      </div>
      <div className="chat-body">
        {conversas.map((conv, index) => (
          <div key={index} className="chat-message">
            <strong>{conv.nome}</strong>
            <p>{conv.ultimaMensagem}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatSec;
