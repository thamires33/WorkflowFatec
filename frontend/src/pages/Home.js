// src/pages/HomePage.js
import React from 'react';
import Sidebar from '../components/Sidebar';

function Home() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="content">
        <h1>Bem-vindo ao Workflow</h1>
        <p>Escolha uma opção no menu.</p>
      </div>
    </div>
  );
}

export default Home;
