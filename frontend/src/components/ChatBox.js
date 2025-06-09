// components/ChatBox.js
import React, { useState } from 'react';
import '../styles/Chatbox.css';

function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { text: input, fromUser: true }]);
      setInput('');
      // Aqui você pode chamar uma API, simular resposta, etc.
    }
  };

  return (
    <div className="chatbox-container">
      {isOpen && (
        <div className="chatbox">
          <div className="chatbox-header">
            <span>Chat com a Secretaria</span>
            <button onClick={toggleChat}>X</button>
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
              placeholder="Digite sua mensagem..."
            />
            <button onClick={handleSend}>Enviar</button>
          </div>
        </div>
      )}

      <button className="chat-toggle" onClick={toggleChat}>
        💬
      </button>
    </div>
  );
}

export default ChatBox;
