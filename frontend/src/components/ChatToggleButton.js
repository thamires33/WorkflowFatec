import React from 'react';
import '../styles/Chat.css';

function ChatToggleButton({ toggleChat }) {
  return (
    <button className="chat-toggle-button" onClick={toggleChat}>
      💬
    </button>
  );
}

export default ChatToggleButton;
