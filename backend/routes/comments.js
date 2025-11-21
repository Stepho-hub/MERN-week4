const express = require('express');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

const router = express.Router();

// Get comments for a post
router.get('/post/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate('author', 'username').sort({ createdAt: -1 });
    res.send(comments);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create comment
router.post('/', auth, async (req, res) => {
  try {
    const comment = new Comment({
      ...req.body,
      author: req.user._id,
    });
    await comment.save();
    await comment.populate('author', 'username');
    res.status(201).send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update comment
router.patch('/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.id, author: req.user._id });
    if (!comment) {
      return res.status(404).send();
    }
    Object.assign(comment, req.body);
    await comment.save();
    await comment.populate('author', 'username');
    res.send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete comment
router.delete('/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({ _id: req.params.id, author: req.user._id });
    if (!comment) {
      return res.status(404).send();
    }
    res.send(comment);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;