const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pages');

router.post('/posts/delete', pageController.deletePost);

module.exports = router;