const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const controller = require('../controllers/salesController');

// Create sale
router.post('/', auth, controller.createSale);

// Get sales for a shop (with optional ?from=&to=)
router.get('/shop/:shopId', auth, controller.getSalesByShop);

// Daily summary
router.get('/summary/:shopId', auth, controller.getDailySummary);

module.exports = router;
