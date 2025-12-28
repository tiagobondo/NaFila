const express = require('express');
const router = express.Router();
const filaController = require('../controllers/fila.controller');

// criar nova fila
router.post('/', filaController.criarFila);

// listar filas do estabelecimento
router.get('/', filaController.listarFilas);

module.exports = router;
