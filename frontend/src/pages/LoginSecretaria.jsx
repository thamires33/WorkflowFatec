import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/Login.css';

function LoginSecretaria() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login-secretaria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ra: email, senha }) // 'ra' sendo usado como email
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('nomeSecretaria', data.nome);
        toast.success(`Bem-vindo(a), ${data.nome}!`);
        navigate('/HomeSec');
      } else {
        toast.error(data.message || 'Credenciais inválidas.');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      toast.error('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="container-login">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login da Secretaria</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default LoginSecretaria;
