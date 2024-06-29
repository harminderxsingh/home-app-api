const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Folder = sequelize.define('Folder', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Folder;
