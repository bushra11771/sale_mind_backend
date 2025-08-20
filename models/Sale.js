const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  terminal: { type: mongoose.Schema.Types.ObjectId, ref: 'Terminal', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional (POS operator)
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }, // unit price
      taxPercentage: { type: Number, default: 0 },
    }
  ],
  totalAmount: { type: Number, required: true },
  taxAmount: { type: Number, default: 0 },
  paymentType: { type: String, enum: ['cash', 'credit'], default: 'cash' },
  customerName: { type: String },
  saleDate: { type: Date, default: Date.now },
  synced: { type: Boolean, default: true } // false = waiting for sync from offline
}, { timestamps: true });

module.exports = mongoose.model('Sale', saleSchema);
