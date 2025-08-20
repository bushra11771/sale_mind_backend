const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const categoryController = require('../controllers/categoryController');


// Create category
router.post('/', auth, categoryController.createCategory);

// Get all categories for logged-in user's business
router.get('/', auth, categoryController.getCategories);

module.exports = router;