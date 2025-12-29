const express = require('express');
const router = express.Router();
const estabelecimentoController = require('../controllers/estabelecimento.controller');


router.get('/me', estabelecimentoController.me);

module.exports = router;