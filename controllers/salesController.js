const Sale = require('../models/Sale');
const Product = require('../models/Product');
const moment = require('moment');

// Create sale (POS app or sync)
exports.createSale = async (req, res) => {
  try {
    const { items, terminal, shop, paymentType } = req.body;

    let total = 0;
    let tax = 0;

    for (let item of items) {
      const subTotal = item.price * item.quantity;
      const itemTax = (subTotal * (item.taxPercentage || 0)) / 100;
      total += subTotal;
      tax += itemTax;

      // Adjust product quantity
      await Product.findByIdAndUpdate(item.product, {
        $inc: { quantity: -item.quantity }
      });
    }

    const sale = await Sale.create({
      ...req.body,
      totalAmount: total + tax,
      taxAmount: tax,
      synced: req.body.synced ?? true,
    });

    res.status(201).json(sale);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get sales for a shop, filtered by date
exports.getSalesByShop = async (req, res) => {
  const { from, to } = req.query;
  const filters = { shop: req.params.shopId };

  if (from && to) {
    filters.saleDate = {
      $gte: moment(from).startOf('day').toDate(),
      $lte: moment(to).endOf('day').toDate()
    };
  }

  const sales = await Sale.find(filters).populate('items.product');
  res.json(sales);
};

// Get summary for a shop
exports.getDailySummary = async (req, res) => {
  const { shopId } = req.params;
  const today = moment().startOf('day');
  const tomorrow = moment(today).add(1, 'day');

  const sales = await Sale.find({
    shop: shopId,
    saleDate: { $gte: today.toDate(), $lt: tomorrow.toDate() }
  });

  const summary = {
    totalSales: sales.length,
    totalAmount: sales.reduce((sum, s) => sum + s.totalAmount, 0),
    totalTax: sales.reduce((sum, s) => sum + s.taxAmount, 0),
    creditSales: sales.filter(s => s.paymentType === 'credit').length,
  };

  res.json(summary);
};
