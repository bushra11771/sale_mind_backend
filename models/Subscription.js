const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  terminal: { type: mongoose.Schema.Types.ObjectId, ref: 'Terminal', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'PKR' },
  paidAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  status: {
    type: String,
    enum: ['active', 'expired'],
    default: 'active'
  }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
