import React from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/Sidebar.css'
import '../styles/Chamado.css';
import ChatBox from '../components/ChatBox';
import '../styles/Chatbox.css'


function Chamado() {


  const chamado = [
    { protocolo: 1001, data: '20/04/2024', hora: '09:15', tipo: 'Urgência de Diploma' },
    { protocolo: 1002, data: '20/04/2024', hora: '10:30', tipo: 'Atestado Médico' },
    // etc...
  ];

  return (
    <div className="home-container">
      <Sidebar />
      <ChatBox/>
      <div className="content">
        <h2>Meus Chamados</h2>
        <table>
          <thead>
            <tr>
              <th>Protocolo</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Tipo</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {chamado.map((ch) => (
              <tr key={ch.protocolo}>
                <td>{ch.protocolo}</td>
                <td>{ch.data}</td>
                <td>{ch.hora}</td>
                <td>{ch.tipo}</td>
                <td><button>Visualizar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Chamado;
