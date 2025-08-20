
const Shop = require('../models/Shop');

exports.createShop = async (req, res) => {
  try {
    const shop = await Shop.create(req.body);
    res.status(201).json(shop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find().populate('business');
    res.json(shops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

