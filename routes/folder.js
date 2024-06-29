const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folderController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, folderController.getFolders);
router.get('/:folderId', authMiddleware, folderController.getFilesByFolder);

module.exports = router;
