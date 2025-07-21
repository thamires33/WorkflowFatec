const db = require('../config/db');
const nodemailer = require('nodemailer');
const path = require('path');

// =================== LISTAR TODOS ===================
exports.listar = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.*, a.nome AS nome_aluno, a.email AS email_aluno 
      FROM chamados c
      JOIN alunos a ON a.ra = c.aluno_ra
    `);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao listar chamados:', error);
    res.status(500).json({ message: 'Erro ao buscar chamados.' });
  }
};

// =================== CRIAR CHAMADO ===================
exports.criar = async (req, res) => {
  const { tipo, descricao, aluno_ra, prioridade = 'Média' } = req.body;
  const anexo = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : null;

  if (!descricao || !tipo || !aluno_ra) {
    return res.status(400).json({ message: 'Campos obrigatórios faltando.' });
  }

  const conn = await db.getConnection();
  try {
    const protocolo = `CH-${Date.now()}`;
    const [result] = await conn.query(
      `INSERT INTO chamados (protocolo, tipo, descricao, aluno_ra, prioridade, status, anexo, criado_em)
       VALUES (?, ?, ?, ?, ?, 'Aberto', ?, NOW())`,
      [protocolo, tipo, descricao, aluno_ra, prioridade, anexo]
    );

    res.status(201).json({ message: 'Chamado criado com sucesso.', id: result.insertId, protocolo });
  } catch (error) {
    console.error('Erro ao criar chamado:', error);
    res.status(500).json({ message: 'Erro interno ao criar chamado.' });
  } finally {
    conn.release();
  }
};

// =================== RESPONDER CHAMADO ===================
exports.responderChamado = async (req, res) => {
  const { id } = req.params;
  const { resposta, mensagem } = req.body;
  const anexo = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : null;

  if (!mensagem || !resposta) {
    return res.status(400).json({ message: 'Mensagem e resposta são obrigatórias.' });
  }

  const mensagemFinal = Array.isArray(mensagem) ? mensagem.join('\n') : mensagem;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [rows] = await conn.query(`
      SELECT c.protocolo, a.email AS email_aluno, a.id AS id_aluno
      FROM chamados c
      JOIN alunos a ON a.ra = c.aluno_ra
      WHERE c.id = ?
    `, [id]);

    if (!rows.length) {
      await conn.rollback();
      return res.status(404).json({ message: 'Chamado não encontrado.' });
    }

    await conn.query(`
      UPDATE chamados
      SET status = 'Atendido', resposta = ?, anexo = ?, atualizado_em = NOW()
      WHERE id = ?
    `, [resposta, anexo, id]);

    await conn.query(`
      INSERT INTO mensagens (id_chamado, id_usuario, mensagem, enviado_em)
      VALUES (?, ?, ?, NOW())
    `, [id, 1, mensagemFinal]);

    await conn.commit();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: rows[0].email_aluno,
      subject: `Resposta ao chamado ${rows[0].protocolo}`,
      text: `Olá,\n\nSua solicitação foi respondida:\n\n${resposta}\n\nAtenciosamente,\nSecretaria Acadêmica`,
      attachments: anexo
        ? [{
            filename: req.file.originalname,
            path: path.resolve(__dirname, '..', '..', 'uploads', req.file.filename),
          }]
        : [],
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Resposta enviada e e-mail disparado com sucesso.', anexo });

  } catch (error) {
    await conn.rollback();
    console.error('Erro ao responder chamado:', error);
    res.status(500).json({ message: 'Erro ao responder chamado.' });
  } finally {
    conn.release();
  }
};

// =================== ENCAMINHAR CHAMADO ===================
exports.encaminharChamado = async (req, res) => {
  const { id } = req.params;
  const { emailDestino, mensagem } = req.body;
  const anexo = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : null;

  if (!emailDestino || !mensagem) {
    return res.status(400).json({ message: 'Email de destino e mensagem são obrigatórios.' });
  }

  try {
    const [rows] = await db.query(`SELECT protocolo, tipo, descricao FROM chamados WHERE id = ?`, [id]);

    if (!rows.length) {
      return res.status(404).json({ message: 'Chamado não encontrado.' });
    }

    const chamado = rows[0];

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailDestino,
      subject: `Encaminhamento do chamado ${chamado.protocolo}`,
      text: `Encaminhamento do chamado:\n\nTipo: ${chamado.tipo}\nDescrição: ${chamado.descricao}\n\nMensagem:\n${mensagem}`,
      attachments: anexo
        ? [{
            filename: req.file.originalname,
            path: path.resolve(__dirname, '..', '..', 'uploads', req.file.filename),
          }]
        : [],
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Chamado encaminhado com sucesso.' });

  } catch (error) {
    console.error('Erro ao encaminhar chamado:', error);
    res.status(500).json({ message: 'Erro ao encaminhar chamado.' });
  }
};

// =================== LISTAR MENSAGENS ===================
exports.listarMensagens = async (req, res) => {
  const { id } = req.params;
  try {
    const [mensagens] = await db.query(
      `SELECT * FROM mensagens WHERE id_chamado = ? ORDER BY enviado_em ASC`,
      [id]
    );
    res.status(200).json(mensagens);
  } catch (error) {
    console.error('Erro ao listar mensagens:', error);
    res.status(500).json({ message: 'Erro ao buscar mensagens do chamado.' });
  }
};

// =================== LISTAR POR ALUNO ===================
exports.listarPorAluno = async (req, res) => {
  const { ra } = req.params;
  try {
    const [chamados] = await db.query(
      `SELECT * FROM chamados WHERE aluno_ra = ? ORDER BY criado_em DESC`,
      [ra]
    );
    res.status(200).json(chamados);
  } catch (error) {
    console.error('Erro ao listar chamados do aluno:', error);
    res.status(500).json({ message: 'Erro ao buscar chamados por RA.' });
  }
};

// =================== LISTAR POR STATUS ===================
exports.listarPorStatus = async (req, res) => {
  const { status } = req.params;
  try {
    const [chamados] = await db.query(
      `SELECT * FROM chamados WHERE status = ? ORDER BY atualizado_em DESC`,
      [status]
    );
    res.status(200).json(chamados);
  } catch (error) {
    console.error('Erro ao listar chamados por status:', error);
    res.status(500).json({ message: 'Erro ao buscar chamados por status.' });
  }
};

// =================== OUTRAS FUNÇÕES OPCIONAIS ===================
// Aqui você pode adicionar outras funções como buscarPorId, atualizar, etc., se desejar

// =================== EXPORTAÇÕES ===================
module.exports = {
  listar,
  criar,
  responderChamado,
  encaminharChamado,
  listarMensagens,
  listarPorAluno,
  listarPorStatus
};
