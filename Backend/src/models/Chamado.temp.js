const db = require('../config/db');

const criar = async ({ aluno_ra, tipo, descricao, prioridade, status, protocolo }) => {
  const [resultado] = await db.execute(
    `INSERT INTO chamados (aluno_ra, tipo, descricao, prioridade, status, protocolo, data_abertura)
     VALUES (?, ?, ?, ?, ?, ?, NOW())`,
    [aluno_ra, tipo, descricao, prioridade, status, protocolo]
  );
  return { protocolo, insertId: resultado.insertId };
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

const listarPorAluno = async (aluno_ra) => {
  const [rows] = await db.execute(
    'SELECT * FROM chamados WHERE aluno_ra = ?',
    [aluno_ra]
  );
  return rows;
};

const listarPorStatus = async (status) => {
  const [rows] = await db.execute('SELECT * FROM chamados WHERE status = ?', [status]);
  return rows;
};

const filtrarPorStatus = async (status) => {
  const [rows] = await db.execute('SELECT * FROM chamados WHERE status = ?', [status]);
  return rows;
};

module.exports = {
  criar,
  listarTodos,
  listarPorStatus,
  listarPorAluno,
  buscarPorId,
  atualizarStatus,
  atualizarChamadoCompleto,
  deletar,
  listarPorStatus,
  filtrarPorStatus,
};
