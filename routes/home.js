const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pages');

router.get('/', pageController.getHome);

module.exports = router;

