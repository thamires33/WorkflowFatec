// Backend/src/routes/chamadoRoutes.js

const express = require('express');
const router = express.Router();
const chamadoController = require('../controllers/chamadoController');

// ✅ CRUD principal
router.post('/', chamadoController.criar);
router.get('/aluno', chamadoController.listarPorAluno);
router.get('/filtro/status', chamadoController.listarPorStatus);
router.get('/:id', chamadoController.buscarPorId);
router.delete('/:id', chamadoController.deletar);

// ✅ Atualizações
router.put('/:id', chamadoController.atualizar);
router.put('/:id/status', chamadoController.atualizarStatus);
router.put('/:id/atribuir', chamadoController.atribuirChamado);

module.exports = router;
