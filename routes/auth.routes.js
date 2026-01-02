import express from 'express';
import { login, registar } from '../controllers/auth.controllers.js';
const router = express.Router();

router.post('/login', login);
router.post('/registar', registar);
// registar estabelecimento

export default router;
