const express = require('express');
const router = express.Router();
const { loginAluno } = require('../controllers/loginAlunoController');

router.post('/login-aluno', loginAluno);

module.exports = router;
