require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const moment = require('moment');

// Routes
const authRoutes = require('./routes/authRoutes');
const businessRoutes = require('./routes/businessRoutes');
const shopRoutes = require('./routes/shopRoutes');
const terminalRoutes = require('./routes/terminalRoutes');
const productRoutes = require('./routes/productRoutes');
const salesRoutes = require('./routes/salesRoutes');
const adminRoutes = require('./routes/adminRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const Terminal = require('./models/Terminal'); 
const categoryRoutes = require('./routes/categoryRoutes');


// App config
const app = express();

app.use(cors());
app.use(express.json());

// Connect DB
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  process.exit(1);
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error("MongoDB Error:", err.message));

// Background Task
const expireTerminals = async () => {
  const now = new Date();
  await Terminal.updateMany(
    { expiryDate: { $lt: now }, status: { $ne: 'expired' } },
    { status: 'expired' }
  );
  console.log('Expired inactive terminals checked.');
};

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/terminals', terminalRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/categories', categoryRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
