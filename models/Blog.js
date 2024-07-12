const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    username: { type: String, required: true },
    date: { type: Date, default: Date.now },
    image: { type: String },
    expirationDate: { type: Date, required: true } // Add the expirationDate field
});

module.exports = mongoose.model('Blog', blogSchema);
