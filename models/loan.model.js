const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Loan = sequelize.define('Loan', {
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    houseBuyingPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    downPaymentAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    loanAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    interestOnLoan: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    annualRateOfInterest: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    dateLoanStarted: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    periodOfLoan: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bankOfLoan: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Loan;
