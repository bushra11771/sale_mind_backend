const express = require('express');
const router = express.Router();
const { auth, authorizeRoles } = require('../middleware/auth');
const controller = require('../controllers/subscriptionController');

// Subscribe a terminal
router.post('/', auth, controller.subscribeTerminal);

// Check terminal status (for POS app)
router.get('/status/:terminalId', controller.checkTerminalStatus);

// Admin/business view subscriptions
router.get('/:terminalId', auth, controller.getTerminalSubscriptions);

module.exports = router;
