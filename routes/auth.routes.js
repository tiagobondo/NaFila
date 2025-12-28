const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// registar estabelecimento
router.post('/registar', authController.registar);

// login
router.post('/login', authController.login);

module.exports = router;
