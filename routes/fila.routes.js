import express from 'express';
const router = express.Router();


import {
  criarFila,
  listarFilas,
  getFilaByCodigo,
  entrarNaFila,
} from '../controllers/fila.controllers.js';

import{ posicaoCliente} from '../controllers/cliente.controllers.js'

import{ proximoCliente} from '../controllers/atendimento.controllers.js'

// criar e listar filas
router.post('/', criarFila);
router.get('/', listarFilas);
router.get('/:codigo', getFilaByCodigo);
router.post('/:idFila/entrar', entrarNaFila);
router.get('/:idFila/posicao/:idCliente', posicaoCliente);
router.post('/:idFila/proximo', proximoCliente);

export default router;
