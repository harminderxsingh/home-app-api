const { File, Folder } = require("../models");
const sequelize = require('../config/db.config');


const getFolders = async (req, res) => {
    try {
        const userId = req.user.id;

        // Count files for each folder for the logged-in user
        const folders = await Folder.findAll({
            attributes: [
                'id',
                'name',
                [sequelize.fn('COUNT', sequelize.col('Files.id')), 'filesCount']
            ],
            include: [
                {
                    model: File,
                    attributes: [],
                    where: { userId },
                    required: false
                }
            ],
            group: ['Folder.id']
        });

        res.json(folders);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Error fetching folders', error: err.message });
    }
};

const getFilesByFolder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { folderId } = req.params;

        const folder = await Folder.findByPk(folderId, {
            attributes: ['name'],
            include: [{
                model: File,
                where: { userId },
                required: false
            }]
        });

        if (!folder) {
            return res.status(404).json({ message: 'Folder not found' });
        }

        res.json({
            folderName: folder.name,
            files: folder.Files
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching files', error: err.message });
    }
};

module.exports = { getFolders, getFilesByFolder };
