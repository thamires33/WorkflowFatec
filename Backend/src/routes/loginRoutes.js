const express = require('express');
const router = express.Router();
const loginSecretariaController = require('../controllers/loginSecretariaController');


router.post('/login', loginSecretariaController.login);


module.exports = router;
