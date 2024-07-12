const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { createBlog, getBlogs, addComment } = require('../controllers/blogController');

// POST route for creating a new blog (protected by admin login)
router.post('/blogs', authMiddleware, createBlog);

// GET route for fetching all blogs
router.get('/blogs', getBlogs);

// POST route for adding a comment to a blog
router.post('/blogs/:id/comments', addComment);

module.exports = router;
