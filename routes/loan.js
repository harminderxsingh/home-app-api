const express = require('express');
const router = express.Router();
const { createLoan, getLoan } = require('../controllers/loanController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, getLoan);
router.post('/', authMiddleware, createLoan);

module.exports = router;
