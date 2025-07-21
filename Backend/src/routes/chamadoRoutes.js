// src/routes/chamadoRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const chamadoController = require('../controllers/chamadoController');

console.log('🔍 ChamadoController:', Object.keys(chamadoController));

/* ==================== ROTAS DE CHAMADOS ==================== */

// LISTAR todos os chamados
router.get('/', chamadoController.listar);

// FILTROS (⚠️ Devem vir antes das rotas com `:id`)
router.get('/aluno/:ra', chamadoController.listarPorAluno);
router.get('/status/:status', chamadoController.listarPorStatus);

// LISTAR mensagens
router.get('/:id/mensagens', chamadoController.listarMensagens);

// BUSCAR por ID
//router.get('/:id', chamadoController.buscarPorId); // ⚠️ Essa precisa ser DEPOIS dos filtros acima

// CRIAR chamado com upload
router.post('/', upload.single('anexo'), chamadoController.criar);

// RESPONDER ao aluno
router.post('/:id/responder', upload.single('anexo'), chamadoController.responderChamado);

// ENCAMINHAR chamado com upload (campo correto: 'arquivo')
router.post('/:id/encaminhar', upload.single('arquivo'), chamadoController.encaminharChamado);

// ATUALIZAR chamado
//router.put('/:id', chamadoController.atualizar);

// ATUALIZAR status
//router.put('/:id/status', chamadoController.atualizarStatus);

// ATRIBUIR responsável
//router.put('/:id/atribuir', chamadoController.atribuirChamado);

// DELETAR chamado
//router.delete('/:id', chamadoController.deletar);

module.exports = router;
