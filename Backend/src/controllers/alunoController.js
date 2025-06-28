const db = require('../config/db');
const bcrypt = require('bcrypt');

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

module.exports = {
  cadastrar
};
