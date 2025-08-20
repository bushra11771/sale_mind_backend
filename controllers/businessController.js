const Business = require('../models/Business');
const Shop = require('../models/Shop');
const Terminal = require('../models/Terminal');
const mongoose = require('mongoose');

// Create a new business
exports.createBusiness = async (req, res) => {
  try {
    const business = await Business.create({ ...req.body, owner: req.user._id });
    res.status(201).json(business);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get businesses by user
exports.getMyBusinesses = async (req, res) => {
  const businesses = await Business.find({ owner: req.user._id });
  res.json(businesses);
};

// Create a shop under a business
exports.createShop = async (req, res) => {
  try {
    const shop = await Shop.create({ ...req.body });
    res.status(201).json(shop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all shops of a business
exports.getShops = async (req, res) => {
  const shops = await Shop.find({ business: req.params.businessId });
  res.json(shops);
};

// Create a terminal
exports.createTerminal = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.body.shop)) {
      return res.status(400).json({ error: "Invalid shop ID" });
    }

    const terminal = await Terminal.create({ ...req.body, shop: new mongoose.Types.ObjectId(req.body.shop) });
    res.status(201).json(terminal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get terminals by shop
exports.getTerminals = async (req, res) => {
  const terminals = await Terminal.find({ shop: req.params.shopId });
  res.json(terminals);
};
