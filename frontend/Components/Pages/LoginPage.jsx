import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const handleLogin = (dadosUsuario) => {
    console.log('Usuário logado:', dadosUsuario);
    // Redirecionar ou salvar token/localStorage aqui
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
