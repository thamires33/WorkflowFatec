// src/controllers/loginController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Login do aluno (RA e senha simples)
const loginAluno = async (req, res) => {
  const { ra, senha } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM alunos WHERE ra = ?', [ra]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'RA não encontrado.' });
    }

    const aluno = rows[0];

    const senhaCorreta = await bcrypt.compare(senha, aluno.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    res.json({
      id: aluno.id,
      nome: aluno.nome,
      perfil: 'aluno',
      ra: aluno.ra
    });
  } catch (error) {
    console.error('Erro no login do aluno:', error);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};


// Login da secretaria (e-mail e senha criptografada)
const loginSecretaria = async (req, res) => {
  const { ra, senha } = req.body;

  try {
    const [sec] = await db.query('SELECT * FROM secretaria WHERE email = ?', [ra]);

    if (sec.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const senhaCorreta = await bcrypt.compare(senha, sec[0].senha);

    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    res.json({
      perfil: 'secretaria',
      nome: sec[0].nome,
      email: sec[0].email
    });
  } catch (error) {
    console.error('Erro no login da secretaria:', error);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};

module.exports = {
  loginAluno,
  loginSecretaria
};
