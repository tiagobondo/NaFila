import express from 'express';
import { getMeuEstabelecimento } from '../controllers/estabelecimento.controllers.js';
const router = express.Router();

router.get('/me', getMeuEstabelecimento);

export default router;