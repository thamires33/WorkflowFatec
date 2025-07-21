const express = require('express');
const router = express.Router();
const {loginSecretaria, loginAluno} = require('../controllers/loginController');

router.post('/login-aluno', loginAluno);
router.post('/login', loginSecretaria);

module.exports = router;
