const db = require('../config/db');

const Chamado = {
  criar: async (chamado) => {
    const sql = `
      INSERT INTO chamados (aluno_ra, tipo, descricao, status, protocolo, data_abertura)
      VALUES (?, ?, ?, ?, ?, NOW())
    `;
    const values = [
      chamado.aluno_ra,
      chamado.tipo,
      chamado.descricao,
      chamado.status || 'Aberto',
      chamado.protocolo
    ];

    const [result] = await db.execute(sql, values);
    return result;
  },

  listarTodos: async () => {
    const [rows] = await db.execute('SELECT * FROM chamados ORDER BY data_abertura DESC');
    return rows;
  },

  buscarPorId: async (id) => {
    const [rows] = await db.execute('SELECT * FROM chamados WHERE id = ?', [id]);
    return rows[0];
  },

  atualizarStatus: async (id, status) => {
    const sql = `
      UPDATE chamados 
      SET status = ?, data_encerramento = NOW()
      WHERE id = ?
    `;
    const [result] = await db.execute(sql, [status, id]);
    return result;
  }
};

module.exports = Chamado;
