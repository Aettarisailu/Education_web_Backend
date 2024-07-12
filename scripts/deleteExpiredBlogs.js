const mongoose = require('mongoose');
const Blog = require('../models/Blog');
require('dotenv').config(); // Load environment variables from .env file

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const deleteExpiredBlogs = async () => {
    try {
        const now = new Date();
        await Blog.deleteMany({ expirationDate: { $lte: now } });
        console.log('Expired blogs deleted successfully.');
    } catch (error) {
        console.error('Error deleting expired blogs:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Run the task immediately
deleteExpiredBlogs();
