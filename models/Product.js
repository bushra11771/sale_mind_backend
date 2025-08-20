const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  name: { type: String, required: true },
  sku: { type: String, unique: true },
  price: { type: Number, required: true },
  wholesalePrice: { type: Number },
  taxPercentage: { type: Number, default: 0 },
  currency: { type: String, default: 'PKR' },
  quantity: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
