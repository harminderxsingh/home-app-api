const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Community = sequelize.define('Community', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true
});

module.exports = Community;
