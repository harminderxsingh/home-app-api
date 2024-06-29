const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, fileController.upload.single('file'), fileController.uploadFile);
router.get('/download/:fileId', fileController.downloadFile);
router.get('/view/:fileId', fileController.viewFile);

module.exports = router;
