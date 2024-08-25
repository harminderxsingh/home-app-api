const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { File } = require('../models');

const uploadDirectory = path.join(__dirname, '../uploads');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

const calculateStorageUsage = async (userId) => {
    const files = await File.findAll({ where: { userId } });
    return files.reduce((total, file) => total + file.size, 0);
};

const uploadFile = async (req, res) => {
    const { id: userId } = req.user;

    try {
        const userStorage = await calculateStorageUsage(userId);

        if (userStorage + req.file.size > 200 * 1024 * 1024) { // 200MB limit
            fs.unlinkSync(req.file.path); // Delete the uploaded file
            return res.status(400).json({ message: 'Storage limit exceeded' });
        }
        await File.create({
            userId,
            folderId: req.body.folderId,
            filename: req.file.filename,
            originalName: req.body.name || req.file.originalname,
            size: req.file.size,
            mimetype: req.file.mimetype,
            path: `/uploads/${req.file.filename}`
        });

        res.json({ message: 'File uploaded successfully', file: req.file });
    } catch (error) {
        console.error(error);
        fs.unlinkSync(req.file.path);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const downloadFile = async (req, res) => {
    const { fileId } = req.params;
    // const userId = req.user.id;
    
    try {
        const file = await File.findOne({
            where: {
                id: fileId,
                // userId: userId
            }
        });

        if (!file) {
            return res.status(404).json({ message: 'File not found or access denied' });
        }
        res.download(path.join(__dirname, '..', file.path), file.originalName);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const viewFile = async (req, res) => {
    const { fileId } = req.params;
    // const userId = req.user.id;

    try {
        const file = await File.findOne({
            where: {
                id: fileId,
                // userId: userId
            }
        });

        if (!file) {
            return res.status(404).json({ message: 'File not found or access denied' });
        }

        res.setHeader('Content-Type', file.mimetype);
        res.setHeader('Content-Disposition', `inline; filename="${file.originalName}"`);
        res.sendFile(path.join(__dirname, '..', file.path));
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteFile = async (req, res) => {
    const { fileId } = req.params;
    const userId = req.user.id;

    try {
        const file = await File.findOne({
            where: {
                id: fileId,
                userId: userId
            }
        });

        if (!file) {
            return res.status(404).json({ message: 'File not found or access denied' });
        }

        // Delete the file from the server
        const filePath = path.join(__dirname, '..', file.path);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Remove the file record from the database
        await file.destroy();

        res.json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    upload,
    uploadFile,
    downloadFile,
    viewFile,
    deleteFile,
};
