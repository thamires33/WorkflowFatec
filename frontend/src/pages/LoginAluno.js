import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { toast } from 'react-toastify';

function LoginAluno() {
  const [ra, setRa] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (ra.length !== 9) {
      toast.error('RA deve conter exatamente 9 dígitos.');
      return;
    }

    if (!senha) {
      toast.error('Preencha a senha.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/login-aluno', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ra, senha }),
      });

      const data = await response.json();
      console.log('Dados recebidos do login:', data);

      if (!response.ok) {
        toast.error(data.message || 'Erro ao fazer login.');
        return;
      }

      if (data.perfil === 'aluno') {
        localStorage.setItem('ra', data.ra);
        localStorage.setItem('alunoNome', data.nome);      // 💡 aqui: backend retorna `nome`
        localStorage.setItem('idAluno', data.id);          // 💡 backend retorna `id`
        toast.success('Login realizado com sucesso!');
        navigate('/HomeAluno');
      } else if (data.perfil === 'secretaria') {
        localStorage.setItem('nomeSecretaria', data.nome); // 💡 tudo certo aqui também
        toast.success('Login da secretaria realizado!');
        navigate('/HomeSec');
      } else {
        toast.error('Perfil desconhecido.');
      }

    } catch (error) {
      console.error('Erro ao conectar com o servidor:', error);
      toast.error('Erro na conexão com o servidor.');
    }
  };

  const handleMicrosoftLogin = () => {
    toast.info('Login com Microsoft em breve...');
  };

  return (
    <div className="container-login">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

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

        <button
          type="button"
          className="microsoft-btn"
          onClick={handleMicrosoftLogin}
        >
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

export default LoginAluno;
