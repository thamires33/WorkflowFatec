const db = require('../config/db');

const login = async (req, res) => {
  const { ra, senha } = req.body;

  try {
    // Tenta como aluno (RA)
    const [aluno] = await db.query('SELECT * FROM alunos WHERE ra = ?', [ra]);

    if (aluno.length > 0 && aluno[0].senha === senha) {
      return res.json({
        perfil: 'aluno',
        nome: aluno[0].nome,
        ra: aluno[0].ra
      });
    }

    // Tenta como secretaria (email usado no campo 'ra')
    const [sec] = await db.query('SELECT * FROM secretaria WHERE email = ?', [ra]);

    if (sec.length > 0 && sec[0].senha === senha) {
      return res.json({
        perfil: 'secretaria',
        nome: sec[0].nome,
        email: sec[0].email
      });
    }

    res.status(401).json({ message: 'Credenciais inválidas.' });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};

module.exports = { login };
