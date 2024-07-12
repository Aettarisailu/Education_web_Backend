const Blog = require('../models/Blog');

// Function to handle blog creation
exports.createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newBlog = new Blog({ title, content });
        await newBlog.save();
        res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Function to handle fetching all blogs
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({ blogs });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Function to add a comment to a blog
exports.addComment = async (req, res) => {
    try {
        const { blogId, comment } = req.body;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        blog.comments.push(comment);
        await blog.save();
        res.status(200).json({ message: 'Comment added successfully', blog });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
