const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.loginAluno = async (req, res) => {
  const { ra, senha } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM alunos WHERE ra = ?', [ra]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'RA não encontrado.' });
    }

    const aluno = rows[0];

    // Se a senha estiver criptografada:
    const senhaValida = await bcrypt.compare(senha, aluno.senha);

    // Se ainda estiver usando senha em texto puro, troque por:
    // const senhaValida = senha === aluno.senha;

    if (!senhaValida) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    res.json({
      perfil: 'aluno',
      nome: aluno.nome,
      ra: aluno.ra
    });

  } catch (error) {
    console.error('Erro no login do aluno:', error);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};
