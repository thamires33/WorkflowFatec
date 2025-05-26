// src/pages/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
    const navigate = useNavigate();

    const handleLogin = () => {
    // Aqui você faria validação
    navigate('/Home');
  };
  const handleMicrosoftLogin = () => {
    alert('Redirecionando para login com Microsoft...');
    // Aqui você pode integrar com Azure AD futuramente
  };

  return (
    <div className="container-login">
      <form className="login-form">
        <h2>Login</h2>
        <input type="text" placeholder="RA" />
        <input type="password" placeholder="Senha" />
        <button type="submit" onClick={handleLogin}>Entrar </button>

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
