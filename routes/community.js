const express = require('express');
const router = express.Router();
const { getCommunities } = require('../controllers/communityController');

// Get communities route
router.get('/', getCommunities);

module.exports = router;
