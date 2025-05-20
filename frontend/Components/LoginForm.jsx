import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem('Login realizado com sucesso!');
        onLogin(data); // Envia dados ao componente pai
      } else {
        setMensagem(data.erro || 'Falha no login');
      }
    } catch (err) {
      setMensagem('Erro na conexão com o servidor');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={estilo.form}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={estilo.input}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        style={estilo.input}
        required
      />
      <button type="submit" style={estilo.botao}>Entrar</button>
      {mensagem && <p style={estilo.mensagem}>{mensagem}</p>}
    </form>
  );
};

const estilo = {
  form: {
    width: '300px',
    margin: '100px auto',
    padding: '20px',
    backgroundColor: '#f2f2f2',
    borderRadius: '10px',
    boxShadow: '0 0 10px #ccc',
    textAlign: 'center'
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #aaa'
  },
  botao: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  mensagem: {
    marginTop: '10px',
    color: '#d00'
  }
};

export default LoginForm;
