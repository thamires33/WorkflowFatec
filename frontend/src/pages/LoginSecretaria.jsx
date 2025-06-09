// src/pages/LoginSecretaria.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginSecretaria() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      setErro('Preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ra: email, senha }) // Usamos 'ra' como campo genérico
      });

      const data = await response.json();

      if (response.ok && data.perfil === 'secretaria') {
        localStorage.setItem('nomeSecretaria', data.nome); // <- Salvamos o nome aqui!
        navigate('/HomeSec'); // vai para o painel da secretaria
      } else {
        setErro(data.message || 'Erro ao fazer login.');
      }
    } catch (err) {
      setErro('Erro na conexão com o servidor.');
      console.error(err);
    }
  };

  return (
    <div className="container-login">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login da Secretaria</h2>
        {erro && <p style={{ color: 'red' }}>{erro}</p>}

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default LoginSecretaria;
