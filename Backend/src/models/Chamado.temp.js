const db = require('../config/db');

const criar = async (chamado) => {
  const sql = `
    INSERT INTO chamado (aluno_ra, tipo, descricao, status, protocolo)
    VALUES (?, ?, ?, ?, ?)
  `;
  return await db.execute(sql, [
    chamado.aluno_ra,
    chamado.tipo,
    chamado.descricao,
    chamado.status,
    chamado.protocolo
  ]);
};

const listarTodos = async () => {
  const [rows] = await db.execute('SELECT * FROM chamados');
  return rows;
};

const buscarPorId = async (id) => {
  const [rows] = await db.execute('SELECT * FROM chamados WHERE id = ?', [id]);
  return rows[0];
};

const atualizarStatus = async (id, status) => {
  const sql = `UPDATE chamados SET status = ? WHERE id = ?`;
  await db.execute(sql, [status, id]);
};

const atualizarChamadoCompleto = async (id, dados) => {
  const { descricao, tipo } = dados;
  const sql = `UPDATE chamados SET descricao = ?, tipo = ? WHERE id = ?`;
  await db.execute(sql, [descricao, tipo, id]);
};

const deletar = async (id) => {
  const sql = `DELETE FROM chamados WHERE id = ?`;
  const [result] = await db.execute(sql, [id]);
  return result;
};

module.exports = {
  criar,
  listarTodos,
  buscarPorId,
  atualizarStatus,
  atualizarChamadoCompleto,
  deletar
};
