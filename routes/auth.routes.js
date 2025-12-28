const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/registar', authController.registar);
router.post('/login', authController.login);

module.exports = router;
