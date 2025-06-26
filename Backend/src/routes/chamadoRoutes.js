// Backend/src/routes/chamadoRoutes.js

const express = require('express');
const router = express.Router();
const chamadoController = require('../controllers/chamadoController');
const db = require('../config/db');
// ✅ CRUD principal
router.post('/', chamadoController.criar);
router.get('/', chamadoController.listarTodos); // para GET /chamados
router.get('/aluno', chamadoController.listarPorAluno);
router.get('/filtro/status', chamadoController.listarPorStatus);
router.get('/:id', chamadoController.buscarPorId);
router.delete('/:id', chamadoController.deletar);

// ✅ Atualizações
router.put('/:id', chamadoController.atualizar);
router.put('/:id/status', chamadoController.atualizarStatus);
router.put('/:id/atribuir', chamadoController.atribuirChamado);

// Rota para atualizar o status do chamado e registrar o responsável
router.patch('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { novoStatus, responsavel } = req.body;

  try {
    const dataAtual = new Date();

    await db.query(`
      UPDATE chamados
      SET status = ?, 
          atualizado_em = ?, 
          responsavel = ?, 
          data_movimentacao = ?
      WHERE id = ?
    `, [novoStatus, dataAtual, responsavel, dataAtual, id]);

    res.status(200).json({ message: 'Status atualizado com sucesso.' });
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    res.status(500).json({ error: 'Erro ao atualizar status.' });
  }
});

module.exports = router;
