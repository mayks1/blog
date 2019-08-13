const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pages');

router.get('/compose', pageController.getCompose);
router.post('/compose', pageController.postCompose);

module.exports = router;