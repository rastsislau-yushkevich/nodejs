const express = require('express');
const { deletePost, editPost, getPosts, addPost } = require('../controllers/api-post-controller');

const router = express.Router();

//Get all posts
router.get('/api/posts', getPosts);
//Add new post
router.post('/api/post', addPost);
//Delete post by ID
router.delete('/api/post/:id', deletePost);
//Update post by ID
router.put('/api/post/:id', editPost);

module.exports = router;