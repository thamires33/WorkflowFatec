import { Link } from 'react-router-dom';

function Sidebar() {
    
  return (
    <div className="sidebar">
      <h2>Workflow</h2>
      <nav>
        <Link to="/home">Início</Link>
        <Link to="../pages/Chamado.js">Meus Chamados</Link>
        <Link to="/mensagem">Mensagem</Link>
        <Link to="/">Sair</Link>
      </nav>
    </div>
  );
}

export default Sidebar;
