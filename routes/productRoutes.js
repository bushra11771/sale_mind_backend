const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const productController = require('../controllers/productController');

// Create product
router.post('/', auth, productController.createProduct);

// Get products for a specific shop
router.get('/shop/:shopId', auth, productController.getProducts);

// Update product
router.put('/:id', auth, productController.updateProduct);

// Delete product
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;
