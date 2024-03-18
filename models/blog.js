const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    coverImageURL: {
        type: String,
        required: false,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,     // Reference to the User model (the author)
        ref: 'user',                              // giving reference to user schema for author.
    }, 
},{timestamps: true});

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;