const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Simulando "banco de dados"
const alunos = [
  { ra: '123456', senha: 'senha123' },
  { ra: '654321', senha: 'abc123' }
];

// Rota de login
app.post('/login', (req, res) => {
  const { ra, senha } = req.body;

  const aluno = alunos.find((aluno) => aluno.ra === ra && aluno.senha === senha);

  if (aluno) {
    res.json({ mensagem: 'Login bem-sucedido!' });
  } else {
    res.status(401).json({ mensagem: 'RA ou senha incorretos.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
