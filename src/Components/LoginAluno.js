import React, { useState } from 'react';

function LoginAluno() {
  const [ra, setRa] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ra, senha }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.mensagem); // Login bem-sucedido
    } else {
      alert(data.mensagem); // RA ou senha incorretos
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    alert('Erro ao conectar com o servidor');
  }
};

    // Aqui  irá depois conectar com o backend

   

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.titulo}>Login</h2>

        <label>RA do Aluno</label>
        <input
          type="text"
          value={ra}
          onChange={(e) => setRa(e.target.value)}
          style={styles.input}
        />

        <label>Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.botao}>Entrar</button>

        <p style={styles.link}>Cadastro de Aluno</p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0'
  },
  form: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    width: '300px'
  },
  titulo: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  botao: {
    padding: '10px',
    backgroundColor: '#e0e0e0',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  link: {
    marginTop: '10px',
    textAlign: 'center',
    color: '#333',
    cursor: 'pointer'
  }
};

export default LoginAluno;
