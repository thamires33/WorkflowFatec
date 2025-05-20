const db = require('../config/db');

const Secretaria = {
  criar: async (secretaria) => {
    const sql = `
      INSERT INTO secretarias (nome, email, senha, setor, criado_em)
      VALUES (?, ?, ?, ?, NOW())
    `;
    const values = [
      secretaria.nome,
      secretaria.email,
      secretaria.senha,
      secretaria.setor
    ];

    const [result] = await db.execute(sql, values);
    return result;
  },

  listarTodas: async () => {
    const [rows] = await db.execute('SELECT * FROM secretarias ORDER BY nome ASC');
    return rows;
  },

  buscarPorEmail: async (email) => {
    const [rows] = await db.execute('SELECT * FROM secretarias WHERE email = ?', [email]);
    return rows[0];
  },

  buscarPorId: async (id) => {
    const [rows] = await db.execute('SELECT * FROM secretarias WHERE id = ?', [id]);
    return rows[0];
  }
};

module.exports = Secretaria;
