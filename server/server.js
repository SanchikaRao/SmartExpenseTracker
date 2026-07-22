const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express(); // <-- Ensure 'app' is initialized here!

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Database Connection
const MONGO_URI = process.env.MONGO_URI;
if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));
}

// Basic Root Route (Test Endpoint)
app.get('/', (req, res) => {
  res.send('Smart Expense Tracker API is running live!');
});

// Expense Routes
// Make sure the string matches your EXACT file name and casing!
const expenseRoutes = require('./routes/expenseRoutes');// or your exact route path
app.use('/api/expenses', expenseRoutes);

// Server Listener for Local Dev & Serverless Export for Vercel
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;