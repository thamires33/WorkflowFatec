import { useNavigate } from 'react-router-dom';

function Cadastro() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Cadastro de Aluno</h2>
      <input placeholder="Nome" />
      <input placeholder="RA" />
      <input placeholder="Senha" type="password" />
      <button onClick={() => navigate('/')}>Cadastrar</button>
    </div>
  );
}

export default Cadastro;
