const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const controller = require('../controllers/businessController');

// Business
router.post('/', auth, controller.createBusiness);
router.get('/', auth, controller.getMyBusinesses);

// Shop
router.post('/shop', auth, controller.createShop);
router.get('/shop/:businessId', auth, controller.getShops);

// Terminal
router.post('/terminal', auth, controller.createTerminal);
router.get('/terminal/:shopId', auth, controller.getTerminals);

module.exports = router;
