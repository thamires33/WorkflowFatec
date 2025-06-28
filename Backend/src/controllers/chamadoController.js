const db = require('../config/db'); // Pool de conexões (mysql2/promise)
const nodemailer = require('nodemailer');

/* =========================================================
   LISTAR TODOS OS CHAMADOS
   ========================================================= */
exports.listar = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        c.*, 
        a.nome AS nome_aluno, 
        a.email AS email_aluno 
      FROM chamados c
      JOIN alunos a ON a.ra = c.aluno_ra
    `);

    console.log('Resultado da query de chamados:', rows);

    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao listar chamados com dados de aluno:', error);
    res.status(500).json({ message: 'Erro ao buscar chamados.' });
  }
};

/* =========================================================
   RESPONDER CHAMADO
   ========================================================= */
exports.responderChamado = async (req, res) => {
  const { id } = req.params;
  const resposta = (req.body.resposta ?? req.body.mensagem ?? '').trim();

  if (!resposta)
    return res.status(400).json({ message: 'Mensagem é obrigatória.' });

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    const [rows] = await conn.query(
      `SELECT c.protocolo, a.email AS email_aluno, a.id AS id_aluno
         FROM chamados c
         JOIN alunos a ON a.ra = c.aluno_ra
        WHERE c.id = ?`,
      [id]
    );

    if (!rows.length) {
      await conn.rollback();
      return res.status(404).json({ message: 'Chamado não encontrado.' });
    }

    const { protocolo, email_aluno, id_aluno } = rows[0];

    if (!email_aluno) {
      await conn.rollback();
      return res.status(400).json({ message: 'Aluno não possui e-mail cadastrado.' });
    }

    await conn.query(
      `UPDATE chamados
          SET status = 'Atendido',
              resposta = ?,
              atualizado_em = NOW()
        WHERE id = ?`,
      [resposta, id]
    );

    await conn.query(
      `INSERT INTO mensagens (id_chamado, id_usuario, mensagem)
       VALUES (?, ?, ?)`,
      [id, 1, resposta] // <-- Substitua 1 por req.user.id se estiver logado
    );

    await conn.commit();
    res.json({ message: 'Resposta enviada com sucesso.' });

  } catch (error) {
    await conn.rollback();
    console.error('Erro ao responder chamado:', error);
    res.status(500).json({ message: 'Erro interno ao responder chamado.' });
  } finally {
    conn.release();
  }
};

exports.criar = async (req, res) => {
  const {
    titulo,
    descricao,
    tipo,
    aluno_ra,
    prioridade = 'Média',
  } = req.body;

  if (!descricao || !tipo || !aluno_ra) {
    return res.status(400).json({ message: 'Campos obrigatórios faltando.' });
  }

  const conn = await (db.getConnection ? db.getConnection() : db);

  try {
    const protocolo = `CH-${Date.now()}`;

    const [result] = await conn.query(
      `INSERT INTO chamados (protocolo, titulo, descricao, tipo, aluno_ra, prioridade, status, criado_em)
       VALUES (?, ?, ?, ?, ?, ?, 'Aberto', NOW())`,
      [protocolo, titulo || tipo, descricao, tipo, aluno_ra, prioridade]
    );

    res.status(201).json({
      message: 'Chamado criado com sucesso.',
      id: result.insertId,
      protocolo,
    });

  } catch (error) {
    console.error('Erro ao criar chamado:', error);
    res.status(500).json({ message: 'Erro interno ao criar chamado.' });
  } finally {
    conn.release?.();
  }
};

exports.listarPorStatus = async (req, res) => {
  const { status } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM chamados WHERE status = ?', [status]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao listar chamados por status:', error);
    res.status(500).json({ message: 'Erro ao buscar chamados por status.' });
  }
};

exports.listarPorAluno = async (req, res) => {
  const { ra } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM chamados WHERE aluno_ra = ?', [ra]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao listar chamados do aluno:', error);
    res.status(500).json({ message: 'Erro ao buscar chamados do aluno.' });
  }
};

exports.buscarPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM chamados WHERE id = ?', [id]);
    if (!rows.length) {
      return res.status(404).json({ message: 'Chamado não encontrado.' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Erro ao buscar chamado por ID:', error);
    res.status(500).json({ message: 'Erro ao buscar chamado.' });
  }
};

exports.listarMensagens = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      'SELECT * FROM mensagens WHERE id_chamado = ? ORDER BY criado_em ASC',
      [id]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao listar mensagens:', error);
    res.status(500).json({ message: 'Erro ao buscar mensagens.' });
  }
};

exports.atualizarStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status)
    return res.status(400).json({ message: 'Status é obrigatório.' });

  try {
    await db.query(
      'UPDATE chamados SET status = ?, atualizado_em = NOW() WHERE id = ?',
      [status, id]
    );
    res.status(200).json({ message: 'Status atualizado com sucesso.' });
  } catch (error) {
    console.error('Erro ao atualizar status do chamado:', error);
    res.status(500).json({ message: 'Erro ao atualizar status.' });
  }
};

exports.atualizar = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, tipo, prioridade, status } = req.body;

  try {
    await db.query(
      `UPDATE chamados 
       SET titulo = ?, descricao = ?, tipo = ?, prioridade = ?, status = ?, atualizado_em = NOW() 
       WHERE id = ?`,
      [titulo, descricao, tipo, prioridade, status, id]
    );

    res.status(200).json({ message: 'Chamado atualizado com sucesso.' });
  } catch (error) {
    console.error('Erro ao atualizar chamado:', error);
    res.status(500).json({ message: 'Erro ao atualizar chamado.' });
  }
};

exports.atribuirChamado = async (req, res) => {
  const { id } = req.params;
  const { responsavel } = req.body;

  if (!responsavel) {
    return res.status(400).json({ message: 'Responsável é obrigatório.' });
  }

  try {
    await db.query(
      'UPDATE chamados SET responsavel = ?, atualizado_em = NOW() WHERE id = ?',
      [responsavel, id]
    );

    res.status(200).json({ message: 'Responsável atribuído com sucesso.' });
  } catch (error) {
    console.error('Erro ao atribuir responsável:', error);
    res.status(500).json({ message: 'Erro ao atribuir responsável.' });
  }
};

exports.deletar = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM chamados WHERE id = ?', [id]);
    res.status(200).json({ message: 'Chamado deletado com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar chamado:', error);
    res.status(500).json({ message: 'Erro ao deletar chamado.' });
  }
};

const Chamado = require('../models/Chamado.temp');


