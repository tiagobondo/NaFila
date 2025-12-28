const express = require('express');
const router = express.Router();
const filaController = require('../controllers/fila.controller');
const clienteController = require('../controllers/cliente.controller');
const atendimentoController = require('../controllers/atendimento.controller');

// criar nova fila
router.post('/', filaController.criarFila);

// listar filas do estabelecimento
router.get('/', filaController.listarFilas);

// buscar fila pelo código
router.get('/:codigo', filaController.buscarPorCodigo);

// cliente entra na fila
router.post('/:idFila/entrar', filaController.entrarNaFila);

// ver posição do cliente
router.get('/:idFila/posicao/:idCliente', filaController.verPosicao);

// chamar próximo cliente
router.post('/:idFila/proximo', filaController.chamarProximo);


module.exports = router;
