const express = require('express');
const router = express.Router();
const ShopController = require('../controllers/shopController');

router.post('/create', ShopController.createShop);
router.get('/', ShopController.getAllShops);

module.exports = router;
