const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

// Cadastro de aluno
router.post('/cadastrar', alunoController.cadastrar);

// Login de aluno
router.post('/login', alunoController.login);

module.exports = router;
