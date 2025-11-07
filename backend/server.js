import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import checkoutRoutes from './routes/checkoutRoutes.js';
dotenv.config();



// Initialize the app
const app = express();
const PORT = process.env.PORT || 5001; // Using 5001 to avoid React's default 5173

// Middleware
app.use(cors()); // Allows cross-origin requests
app.use(express.json()); // Parses incoming JSON payloads

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);

// A simple test route
app.get('/', (req, res) => {
  res.send('Vibe Commerce backend is running!');
});

// Start the server
app.listen(PORT, () => {
    connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});