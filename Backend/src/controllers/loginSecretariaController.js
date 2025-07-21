// src/controllers/loginController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');

// ======================= LOGIN ALUNO =======================
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

    res.status(200).json({
      idAluno: aluno.id,
      nome: aluno.nome,
      perfil: 'aluno',
      ra: aluno.ra
    });

  } catch (error) {
    console.error('❌ Erro no login do aluno:', error);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};

// ===================== LOGIN SECRETARIA =====================
const loginSecretaria = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM secretaria WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const secretaria = rows[0];

    // TEMPORÁRIO: sem hash
    if (senha !== secretaria.senha) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    res.status(200).json({
      idSecretaria: secretaria.id,
      nome: secretaria.nome,
      perfil: 'secretaria',
      email: secretaria.email
    });

  } catch (error) {
    console.error('❌ Erro no login da secretaria:', error);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};

// ===================== EXPORTAÇÃO =====================
module.exports = {
  loginAluno,
  loginSecretaria
};

