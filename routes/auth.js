const express = require('express');
const router = express.Router();
const { signup, login, updateProfile, updateNotification } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');


// router.post('/facebook', facebookLogin);
router.post('/signup', signup);
router.post('/login', login);
router.put('/profile', authMiddleware, updateProfile);
router.put('/notification', authMiddleware, updateNotification);

module.exports = router;
