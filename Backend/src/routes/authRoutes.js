// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();

const {
  loginAluno,
  loginSecretaria
} = require('../controllers/loginController');

// Rota de login para alunos
router.post('/login-aluno', loginAluno);

// Rota de login para secretaria
router.post('/login-secretaria', loginSecretaria);

module.exports = router;
