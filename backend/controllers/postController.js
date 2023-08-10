const { User, Post } = require('../models');

const postController = {

// Get a single post
    getPost: async (req, res) => {
        try {
            const post = await Post.findByPk(req.params.id);
            if (!post) {
                res.status(404).json({ message: 'No post found' });
                return;
            }
            res.status(200).json(post);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get all posts
    getPosts: async (req, res) => {
        try {
            const posts = await Post.findAll();
            res.status(200).json(posts)
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // create a post
    createPost: async (req, res) => {
        try {
            const newPost = await Post.create(req.body);
            res.status(200).json(newPost);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // update a post
    updatePost: async (req, res) => {
        try {
            const updatedPost = await Post.update(req.body, {
                where: {
                    id: req.params.id,
                },
            });
            if (!updatedPost[0]) {
                res.status(404).json({ message: 'No post found' });
                return;
            }
            res.status(200).json(updatedPost);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // delete a post
    deletePost: async (req, res) => {
        try {
            const deletedPost = await Post.destroy({
                where: {
                    id: req.params.id,
                },
            });
            if (!deletedPost) {
                res.status(404).json({ message: 'No post found' });
                return;
            }
            res.status(200).json(deletedPost);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

module.exports = postController;