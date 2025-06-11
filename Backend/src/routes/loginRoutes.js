const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/login-aluno', loginController.loginAluno);
router.post('/login-secretaria', loginController.loginSecretaria);

module.exports = router;
