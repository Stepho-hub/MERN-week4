const express = require('express');
const multer = require('multer');
const path = require('path');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Images only!'));
    }
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'post',
          as: 'comments'
        }
      },
      {
        $addFields: {
          commentCount: { $size: '$comments' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author'
        }
      },
      {
        $unwind: '$author'
      },
      {
        $project: {
          _id: 1,
          title: 1,
          content: 1,
          image: 1,
          tags: 1,
          likes: 1,
          createdAt: 1,
          updatedAt: 1,
          author: { username: 1 },
          commentCount: 1
        }
      },
      {
        $sort: { createdAt: -1 }
      }
    ]);
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username').populate('likes', 'username');
    if (!post) {
      return res.status(404).send();
    }
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create post
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const postData = {
      ...req.body,
      author: req.user._id,
    };

    // Parse tags if it's a string (from FormData)
    if (postData.tags && typeof postData.tags === 'string') {
      postData.tags = postData.tags.split(',').map(tag => tag.trim());
    }

    if (req.file) {
      postData.image = req.file.filename;
    }

    const post = new Post(postData);
    await post.save();
    await post.populate('author', 'username');
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update post
router.patch('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, author: req.user._id });
    if (!post) {
      return res.status(404).send();
    }
    Object.assign(post, req.body);
    await post.save();
    await post.populate('author', 'username');
    res.send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id, author: req.user._id });
    if (!post) {
      return res.status(404).send();
    }
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Like/Unlike post
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send();
    }
    const isLiked = post.likes.includes(req.user._id);
    if (isLiked) {
      post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
    } else {
      post.likes.push(req.user._id);
    }
    await post.save();
    await post.populate('likes', 'username');
    res.send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;