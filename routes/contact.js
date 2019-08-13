const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pages');

router.get('/contact', pageController.getContact);

module.exports = router;