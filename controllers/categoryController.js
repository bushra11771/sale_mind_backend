const Category = require('../models/Category');

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
      business: req.user.businessId || req.user._id // adjust as needed
    });

    await category.save();
    res.status(201).json(category);
  } catch (err) {
    console.error('Error creating category:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all categories for a business
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ business: req.user.businessId || req.user._id });
    res.json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
