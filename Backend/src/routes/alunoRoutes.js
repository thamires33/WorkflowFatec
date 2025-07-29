const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');


router.post('/', alunoController.cadastrar);

module.exports = router;
