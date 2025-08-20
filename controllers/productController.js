const Product = require('../models/Product');
const Category = require('../models/Category');

// CATEGORY

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create({ ...req.body, business: req.user._id });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCategories = async (req, res) => {
  const categories = await Category.find({ business: req.user._id });
  res.json(categories);
};

// PRODUCT

exports.createProduct = async (req, res) => {
  try {
    console.log('Product body:', req.body); 
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getProducts = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.shopId)) {
      return res.status(400).json({ error: 'Invalid shop ID' });
    }

    const products = await Product.find({ shop: req.params.shopId })
      .populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
