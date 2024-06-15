const { DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
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
    communityId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    houseNo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    countryCode: {
        type: DataTypes.STRING,
        allowNull: true
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
    housePurchasedDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    solarPanelCleanedDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    septicTankCleanedDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

// Custom instance method to get user data as JSON without password field
User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
};

// Instance method to generate JWT token
User.prototype.generateJwtToken = function () {
    return jwt.sign({ id: this.id, fullName: this.fullName }, SECRET_KEY, { expiresIn: '6h' });
};

module.exports = User;
