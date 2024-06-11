const { Loan } = require('../models');

exports.createLoan = async (req, res) => {
    try {
        const loan = await Loan.create(req.body);
        res.status(201).json(loan);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
