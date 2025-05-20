import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Aqui você faria validação
    navigate('/Home');
  };

  return (
    <div className="container">
      <h2>Login Aluno</h2>
      <input placeholder="RA do Aluno" />
      <input placeholder="Senha" type="password" />
      <button onClick={handleLogin}>Entrar</button>
      <p onClick={() => navigate('/cadastro')}>Cadastrar Aluno</p>
    </div>
  );
}

export default Login;
