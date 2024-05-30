const express = require('express');
const router = express.Router();
const { facebookLogin, signup, login } = require('../controllers/authController');


router.post('/facebook', facebookLogin);
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
