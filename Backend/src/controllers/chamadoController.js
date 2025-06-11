const db = require('../config/db');

// Criar chamado
const criar = async (req, res) => {
  const { protocolo, tipo, descricao, id_aluno } = req.body;

  if (!protocolo || !tipo || !id_aluno) {
    return res.status(400).json({ message: 'Campos obrigatórios não informados.' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO chamados (protocolo, tipo, descricao, id_aluno, status) VALUES (?, ?, ?, ?, ?)',
      [protocolo, tipo, descricao || '', id_aluno, 'Aberto']
    );
    res.status(201).json({ id: result.insertId, message: 'Chamado criado com sucesso.' });
  } catch (error) {
    console.error('Erro ao criar chamado:', error);
    res.status(500).json({ message: 'Erro ao criar chamado.' });
  }
};

// Listar todos os chamados
const listar = async (req, res) => {
  try {
    const [result] = await db.query('SELECT * FROM chamados');
    res.json(result);
  } catch (error) {
    console.error('Erro ao listar chamados:', error);
    res.status(500).json({ message: 'Erro ao listar chamados.' });
  }
};

// Buscar chamado por ID
const buscarPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('SELECT * FROM chamados WHERE id = ?', [id]);
    if (result.length === 0) {
      return res.status(404).json({ message: 'Chamado não encontrado.' });
    }
    res.json(result[0]);
  } catch (error) {
    console.error('Erro ao buscar chamado:', error);
    res.status(500).json({ message: 'Erro ao buscar chamado.' });
  }
};

// Listar chamados por aluno
const listarPorAluno = async (req, res) => {
  const { id_aluno } = req.query;

  try {
    const [result] = await db.query('SELECT * FROM chamados WHERE id_aluno = ?', [id_aluno]);
    res.json(result);
  } catch (error) {
    console.error('Erro ao listar chamados por aluno:', error);
    res.status(500).json({ message: 'Erro ao listar chamados por aluno.' });
  }
};

// Listar chamados por status
const listarPorStatus = async (req, res) => {
  const { status } = req.query;

  try {
    const [result] = await db.query('SELECT * FROM chamados WHERE status = ?', [status]);
    res.json(result);
  } catch (error) {
    console.error('Erro ao filtrar chamados por status:', error);
    res.status(500).json({ message: 'Erro ao filtrar chamados por status.' });
  }
};

// Atualizar chamado completo
const atualizar = async (req, res) => {
  const { id } = req.params;
  const { protocolo, tipo, descricao, status } = req.body;

  try {
    await db.query(
      'UPDATE chamados SET protocolo = ?, tipo = ?, descricao = ?, status = ? WHERE id = ?',
      [protocolo, tipo, descricao, status, id]
    );
    res.json({ message: 'Chamado atualizado com sucesso.' });
  } catch (error) {
    console.error('Erro ao atualizar chamado:', error);
    res.status(500).json({ message: 'Erro ao atualizar chamado.' });
  }
};

// Atualizar apenas status
const atualizarStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await db.query('UPDATE chamados SET status = ? WHERE id = ?', [status, id]);
    res.json({ message: 'Status atualizado com sucesso.' });
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    res.status(500).json({ message: 'Erro ao atualizar status.' });
  }
};

// Atribuir responsável
const atribuirChamado = async (req, res) => {
  const { id } = req.params;
  const { responsavel, data_movimentacao } = req.body;

  try {
    await db.query(
      'UPDATE chamados SET responsavel = ?, data_movimentacao = ? WHERE id = ?',
      [responsavel, data_movimentacao, id]
    );
    res.json({ message: 'Chamado atribuído com sucesso.' });
  } catch (error) {
    console.error('Erro ao atribuir chamado:', error);
    res.status(500).json({ message: 'Erro ao atribuir chamado.' });
  }
};

// Deletar chamado
const deletar = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM chamados WHERE id = ?', [id]);
    res.json({ message: 'Chamado excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir chamado:', error);
    res.status(500).json({ message: 'Erro ao excluir chamado.' });
  }
};

module.exports = {
  criar,
  listar,
  buscarPorId,
  listarPorAluno,
  listarPorStatus,
  atualizar,
  atualizarStatus,
  atribuirChamado,
  deletar
};
