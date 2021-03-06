const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pages');

router.get('/posts/:postUrl', pageController.getPost);

module.exports = router;