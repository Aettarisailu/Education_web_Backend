// routes/blogRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const Blog = require('../models/Blog');

// Multer setup for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// POST route to create a new blog
router.post('/blogs', upload.single('image'), async (req, res) => {
    try {
        const { title, content, username, expirationDate } = req.body;
        const image = req.file ? req.file.path : null;

        if (!title || !content || !username || !expirationDate) {
            throw new Error('Title, content, username, and expiration date are required');
        }

        const blog = new Blog({ title, content, username, image, date: new Date(), expirationDate: new Date(expirationDate) });
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        console.error('Error posting blog:', error);
        res.status(500).json({ error: 'Error posting blog', details: error.message });
    }
});

// GET route to fetch all blogs
router.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ date: -1 });
        res.status(200).json({ blogs });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching blogs' });
    }
});

module.exports = router;
