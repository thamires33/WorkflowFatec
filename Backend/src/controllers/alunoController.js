// backend/controllers/alunoController.js
const db = require('../config/db');
const bcrypt = require('bcrypt');

// Função para cadastrar aluno
const cadastrar = async (req, res) => {
  const { nome, email, senha, ra } = req.body;

  if (!nome || !email || !senha || !ra) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    const hash = await bcrypt.hash(senha, 10);

    await db.query(
      'INSERT INTO alunos (nome, email, senha, ra) VALUES (?, ?, ?, ?)',
      [nome, email, hash, ra]
    );

    res.status(201).json({ message: 'Aluno cadastrado com sucesso.' });
  } catch (error) {
    console.error('Erro ao cadastrar aluno:', error);
    res.status(500).json({ message: 'Erro ao cadastrar aluno.' });
  }
};

// 🟡 Função de login do aluno
const login = async (req, res) => {
  const { ra, senha } = req.body;

  if (!ra || !senha) {
    return res.status(400).json({ message: 'RA e senha são obrigatórios.' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM alunos WHERE ra = ?', [ra]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Aluno não encontrado.' });
    }

    const aluno = rows[0];
    const senhaCorreta = await bcrypt.compare(senha, aluno.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    res.status(200).json({ message: 'Login realizado com sucesso.', nome: aluno.nome });
  } catch (error) {
    console.error('Erro no login do aluno:', error);
    res.status(500).json({ message: 'Erro ao realizar login.' });
  }
};

module.exports = {
  cadastrar,
  login
};
