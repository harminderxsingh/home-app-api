const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret_key';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    community: {
        type: DataTypes.STRING,
        allowNull: false
    },
    houseNo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    countryCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customerNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: true
    },
    occupation: {
        type: DataTypes.STRING,
        defaultValue: '',
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    interests: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    householdSize: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    pets: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    accessibility: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

User.prototype.generateJwtToken = function () {
    return jwt.sign({ id: this.id, fullName: this.fullName }, SECRET_KEY, { expiresIn: '1h' });
};

module.exports = User