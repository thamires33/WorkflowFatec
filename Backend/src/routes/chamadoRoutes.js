const express = require('express');
const router = express.Router();
const chamadoController = require('../controllers/chamadoController');

// Rota de atualização completa
router.put('/:id', chamadoController.atualizar);

// Rota de atualização de status
router.put('/:id/status', chamadoController.atualizarStatus);

// Outras rotas...
router.post('/', chamadoController.criar);
router.get('/', chamadoController.listar);
router.get('/:id', chamadoController.buscarPorId);
router.delete('/:id', chamadoController.deletar);

module.exports = router;
