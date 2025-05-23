// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import Chamado from './pages/Chamado';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Chamado" element={<Chamado />} />
      </Routes>
    </Router>
  );
}

export default App;
