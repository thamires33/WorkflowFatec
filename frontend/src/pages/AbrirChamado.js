import React, { useState } from 'react';

function AbrirChamado() {
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const aluno_ra = localStorage.getItem('aluno_ra');

    if (!tipo || !descricao || !aluno_ra) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/chamados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tipo,
          descricao,
          aluno_ra
        })
      });

      const resultado = await response.json();

      if (response.ok) {
        alert('✅ Chamado aberto com sucesso!');
        setTipo('');
        setDescricao('');
      } else {
        alert(`❌ Erro: ${resultado.message}`);
      }

    } catch (err) {
      console.error('Erro ao abrir chamado:', err);
      alert('❌ Erro interno ao abrir chamado.');
    }
  };

  return (
    <div className="content">
      <h2>Abrir Chamado</h2>
      <form onSubmit={handleSubmit}>
        <label>Tipo de Chamado:</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="">Selecione</option>
          <option value="Histórico Escolar">Histórico Escolar</option>
          <option value="Atestado de Matrícula">Atestado de Matrícula</option>
          <option value="Urgência de Diploma">Urgência de Diploma</option>
          <option value="Meus Documentos">Meus Documentos</option>
        </select>

        <label>Descrição:</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <button type="submit">Enviar Chamado</button>
      </form>
    </div>
  );
}

export default AbrirChamado;
