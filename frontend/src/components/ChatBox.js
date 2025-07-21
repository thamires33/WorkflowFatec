// components/ChatBox.js
import React, { useState } from 'react';
import '../styles/Chatbox.css';

function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Abre/fecha o chat
  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  // Envia mensagem do usuário
  const handleSend = () => {
    const trimmed = input.trim();
    if (trimmed !== '') {
      setMessages(prev => [...prev, { text: trimmed, fromUser: true }]);
      setInput('');

      // Exemplo de resposta automática
      setTimeout(() => {
        setMessages(prev => [...prev, { text: 'Recebido! Aguardando retorno da secretaria.', fromUser: false }]);
      }, 1000);
    }
  };

  // Enviar com Enter (opcional)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chatbox-container">
      {isOpen && (
        <div className="chatbox">
          <div className="chatbox-header">
            <span>Chat com a Secretaria</span>
            <button onClick={toggleChat}>×</button>
          </div>

          <div className="chatbox-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.fromUser ? 'user' : 'bot'}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbox-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite sua mensagem..."
            />
            <button onClick={handleSend}>Enviar</button>
          </div>
        </div>
      )}

      <button className="chat-toggle" onClick={toggleChat} title="Abrir/Fechar Chat">
        💬
      </button>
    </div>
  );
}

export default ChatBox;
