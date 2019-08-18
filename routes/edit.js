const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pages');

router.get('/posts/:postUrl/edit', pageController.editPost);

module.exports = router;