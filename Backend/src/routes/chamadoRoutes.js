const express = require('express');
const router = express.Router();
const chamadoController = require('../controllers/chamadoController');
<<<<<<< HEAD

// Verificação de que todas as funções estão exportadas corretamente
console.log('Funções do controller:');
[
  'criar',
  'responderChamado',
  'listar',
  'listarPorAluno',
  'listarPorStatus',
  'listarMensagens',
  'buscarPorId',
  'atualizar',
  'atualizarStatus',
  'atribuirChamado',
  'deletar'
].forEach((fn) => {
  console.log(`${fn}:`, typeof chamadoController[fn]);
});
=======
const db = require('../config/db');
// ✅ CRUD principal
router.post('/', chamadoController.criar);
router.get('/', chamadoController.listarTodos); // para GET /chamados
router.get('/aluno', chamadoController.listarPorAluno);
router.get('/filtro/status', chamadoController.listarPorStatus);
router.get('/:id', chamadoController.buscarPorId);
router.delete('/:id', chamadoController.deletar);
>>>>>>> rafront

/* =========================================================
   CRUD principal de chamados
   ========================================================= */

// LISTAR todos os chamados
router.get('/', chamadoController.listar);

// CRIAR um novo chamado
router.post('/', chamadoController.criar);

// RESPONDER chamado ao aluno
router.post('/:id/responder', chamadoController.responderChamado);

// FILTROS (devem vir antes das rotas genéricas com :id)
router.get('/aluno/:ra', chamadoController.listarPorAluno)
router.get('/status/:status', chamadoController.listarPorStatus);

// LISTAR mensagens de um chamado
router.get('/:id/mensagens', chamadoController.listarMensagens);

// BUSCAR por ID
router.get('/:id', chamadoController.buscarPorId);

// ATUALIZAR chamado completo
router.put('/:id', chamadoController.atualizar);

// ATUALIZAR apenas status
router.put('/:id/status', chamadoController.atualizarStatus);

// ATRIBUIR responsável
router.put('/:id/atribuir', chamadoController.atribuirChamado);

// DELETAR chamado
router.delete('/:id', chamadoController.deletar);

module.exports = router;
