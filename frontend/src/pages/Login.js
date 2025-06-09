// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [ra, setRa] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validação simples
    if (!ra || !senha) {
      setErro('Preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ra, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        // Exemplo: perfil pode ser 'aluno' ou 'secretaria'
        if (data.perfil === 'aluno') {
          navigate('/home');
        } else if (data.perfil === 'secretaria') {
          navigate('/HomeSec');
        } else {
          setErro('Perfil desconhecido.');
        }
      } else {
        setErro(data.message || 'Erro ao fazer login.');
      }
    } catch (error) {
      setErro('Erro na conexão com o servidor.');
      console.error(error);
    }
  };

  const handleMicrosoftLogin = () => {
    alert('Redirecionando para login com Microsoft...');
  };

  return (
    <div className="container-login">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        {erro && <p className="erro-login">{erro}</p>}

        <input
          type="text"
          placeholder="RA"
          value={ra}
          onChange={(e) => setRa(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit">Entrar</button>

        <div className="divider">ou</div>

        <button type="button" className="microsoft-btn" onClick={handleMicrosoftLogin}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
            alt="Microsoft"
            className="microsoft-logo"
          />
          Entrar com Microsoft
        </button>
      </form>
    </div>
  );
}

export default Login;
