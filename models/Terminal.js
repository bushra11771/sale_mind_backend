const mongoose = require('mongoose');

const terminalSchema = new mongoose.Schema({
  shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  name: { type: String, required: true },
  deviceId: { type: String, required: true }, // unique identifier from Android device
  status: {
    type: String,
    enum: ['active', 'expired', 'inactive'],
    default: 'active',
  },
  expiryDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Terminal', terminalSchema);
  