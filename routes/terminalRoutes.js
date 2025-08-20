// routes/terminalRoutes.js
const express = require('express');
const router = express.Router();
const TerminalController = require('../controllers/terminalController');

// Example routes
router.post('/create', TerminalController.createTerminal);
router.get('/', TerminalController.getAllTerminals);

module.exports = router;
