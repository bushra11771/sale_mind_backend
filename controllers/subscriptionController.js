const Subscription = require('../models/Subscription');
const Terminal = require('../models/Terminal');
const moment = require('moment');

// Subscribe a terminal (manual or auto-renew)
exports.subscribeTerminal = async (req, res) => {
  try {
    const { terminal, amount } = req.body;

    const startDate = new Date();
    const expiry = moment(startDate).add(1, 'month').toDate();

    const subscription = await Subscription.create({
      terminal,
      amount,
      expiresAt: expiry
    });

    // Activate terminal
    await Terminal.findByIdAndUpdate(terminal, {
      status: 'active',
      expiryDate: expiry
    });

    res.status(201).json(subscription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Check terminal status (can be used by Android app)
exports.checkTerminalStatus = async (req, res) => {
  const terminal = await Terminal.findById(req.params.terminalId);

  if (!terminal) return res.status(404).json({ message: 'Terminal not found' });

  if (new Date() > terminal.expiryDate) {
    terminal.status = 'expired';
    await terminal.save();
  }

  res.json({ status: terminal.status, expiryDate: terminal.expiryDate });
};

// List subscriptions for admin or business
exports.getTerminalSubscriptions = async (req, res) => {
  const { terminalId } = req.params;
  const subs = await Subscription.find({ terminal: terminalId }).sort({ createdAt: -1 });
  res.json(subs);
};
