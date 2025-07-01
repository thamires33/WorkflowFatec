import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
//import { toast } from 'react-toastify';

function LoginAluno() {
  const [ra, setRa] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const resposta = await fetch('http://localhost:3000/api/alunos/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ra, senha }),
    });

    const data = await resposta.json();

    if (resposta.ok) {
      localStorage.setItem('nomeAluno', data.nome);
      localStorage.setItem('ra', ra);
      navigate('/home');
    } else {
      setErro(data.message || 'RA ou senha inválidos');
    }
  };

  return (
    <div className="container-login">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login do Aluno</h2>
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
        {erro && <p className="login-error">{erro}</p>}

        <div className="divider">ou</div>

        <button className="microsoft-btn">
          <img
            src="https://img.icons8.com/color/48/000000/microsoft.png"
            alt="Microsoft logo"
            className="microsoft-logo"
          />
          Entrar com Microsoft
        </button>
      </form>
    </div>
  );
}

export default LoginAluno;
