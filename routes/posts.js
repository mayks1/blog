const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pages');

router.get('/posts/:postName', pageController.getPost);

module.exports = router;