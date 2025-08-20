const User = require('../models/User');
const Business = require('../models/Business');
const Shop = require('../models/Shop');
const Terminal = require('../models/Terminal');
const Subscription = require('../models/Subscription');

// Get all registered business accounts
exports.getAllBusinesses = async (req, res) => {
  const businesses = await Business.find().populate('owner');
  res.json(businesses);
};

// Get shops & terminal count per business
exports.getBusinessDetails = async (req, res) => {
  const businessId = req.params.businessId;

  const shops = await Shop.find({ business: businessId });
  const shopIds = shops.map(shop => shop._id);
  const terminals = await Terminal.find({ shop: { $in: shopIds } });

  res.json({
    shopCount: shops.length,
    terminalCount: terminals.length,
    shops,
    terminals
  });
};

// Activate/deactivate a business
exports.toggleBusinessStatus = async (req, res) => {
  const business = await Business.findById(req.params.businessId);
  if (!business) return res.status(404).json({ message: 'Business not found' });

  business.isActive = !business.isActive;
  await business.save();

  res.json({ message: `Business ${business.isActive ? 'activated' : 'deactivated'}` });
};

// Get system dashboard metrics
exports.getAdminDashboard = async (req, res) => {
  const businessCount = await Business.countDocuments();
  const shopCount = await Shop.countDocuments();
  const terminalCount = await Terminal.countDocuments();
  const expiredCount = await Terminal.countDocuments({ status: 'expired' });
  const activeCount = await Terminal.countDocuments({ status: 'active' });

  res.json({
    businesses: businessCount,
    shops: shopCount,
    terminals: terminalCount,
    expiredTerminals: expiredCount,
    activeTerminals: activeCount,
  });
};
