const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./db'); // Initializes DB connection

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5174",
    "https://avcrafts.vercel.app" // later
  ],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
const shopRoutes = require('./routes/shop');
const orderRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');
const addressRoutes = require('./routes/addresses');

app.use('/api', shopRoutes);
app.use('/api', orderRoutes);
app.use('/api', authRoutes);
app.use('/api', addressRoutes);

app.get('/', (req, res) => {
    res.send('AVCrafts API is running');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

