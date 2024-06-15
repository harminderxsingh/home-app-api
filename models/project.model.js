const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Project = sequelize.define('Project', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = Project;
