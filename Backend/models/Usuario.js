const db = require('../config/db');

const Usuario = {
  criar: async (usuario) => {
    const sql = `
      INSERT INTO usuarios (ra, email, senha, tipo, criado_em)
      VALUES (?, ?, ?, ?, NOW())
    `;
    const values = [
      usuario.ra || null,
      usuario.email,
      usuario.senha,
      usuario.tipo
    ];

    const [result] = await db.execute(sql, values);
    return result;
  },

  buscarPorEmail: async (email) => {
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0];
  },

  buscarPorId: async (id) => {
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
    return rows[0];
  }
};

module.exports = Usuario;
