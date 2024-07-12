const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const blogRoutes = require('./routes/blogRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware to parse request body
app.use(bodyParser.json());

// Routes
app.use('/api', blogRoutes);

// Start server on port 5030
const PORT = process.env.PORT || 5030;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
