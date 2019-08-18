const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pages');

router.post('/posts/:postUrl/update', pageController.updatePost);

module.exports = router;