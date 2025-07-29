const db = require('../config/db');

// Cria um novo chamado
const criar = async ({ aluno_ra, tipo, descricao, prioridade, status, protocolo }) => {
  const [resultado] = await db.execute(
    `INSERT INTO chamados (aluno_ra, tipo, descricao, prioridade, status, protocolo, data_abertura)
     VALUES (?, ?, ?, ?, ?, ?, NOW())`,
    [aluno_ra, tipo, descricao, prioridade, status, protocolo]
  );
  return { protocolo, insertId: resultado.insertId };
};

// Lista todos os chamados
const listarTodos = async () => {
  const [rows] = await db.execute('SELECT * FROM chamados');
  return rows;
};

// Lista chamados por status
const listarPorStatus = async (status) => {
  const [rows] = await db.execute('SELECT * FROM chamados WHERE status = ?', [status]);
  return rows;
};

// Lista chamados por RA do aluno
const listarPorAluno = async (aluno_ra) => {
  const [rows] = await db.execute('SELECT * FROM chamados WHERE aluno_ra = ?', [aluno_ra]);
  return rows;
};

// Busca chamado por ID
const buscarPorId = async (id) => {
  const [rows] = await db.execute('SELECT * FROM chamados WHERE id = ?', [id]);
  return rows[0];
};

// Atualiza apenas o status do chamado
const atualizarStatus = async (id, status) => {
  const sql = `UPDATE chamados SET status = ? WHERE id = ?`;
  await db.execute(sql, [status, id]);
};

// Atualiza dados completos (tipo e descrição)
const atualizarChamadoCompleto = async (id, dados) => {
  const { descricao, tipo } = dados;
  const sql = `UPDATE chamados SET descricao = ?, tipo = ? WHERE id = ?`;
  await db.execute(sql, [descricao, tipo, id]);
};

// Deleta chamado
const deletar = async (id) => {
  const sql = `DELETE FROM chamados WHERE id = ?`;
  const [result] = await db.execute(sql, [id]);
  return result;
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
};
