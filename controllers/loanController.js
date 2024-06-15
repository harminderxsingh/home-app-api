const { Loan } = require('../models');

exports.getLoan = async (req, res) => {
    const { id } = req.user;
    try {
        const loan = await Loan.findOne({ where: { userId: id } });
        res.status(200).json({ loan });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.createLoan = async (req, res) => {
    const { id: userId } = req.user;
    try {
        const {
            projectId,
            houseBuyingPrice,
            downPaymentAmount,
            loanAmount,
            interestOnLoan,
            annualRateOfInterest,
            dateLoanStarted,
            periodOfLoan,
            bankOfLoan
        } = req.body;

        const existingLoan = await Loan.findOne({ where: { userId } });

        let loan;
        if (existingLoan) {
            // Update the existing loan
            loan = await existingLoan.update({
                projectId,
                houseBuyingPrice,
                downPaymentAmount,
                loanAmount,
                interestOnLoan,
                annualRateOfInterest,
                dateLoanStarted,
                periodOfLoan,
                bankOfLoan
            });
            res.status(200).json({ message: 'Loan updated successfully', loan });
        } else {
            loan = await Loan.create({
                userId,
                projectId,
                houseBuyingPrice,
                downPaymentAmount,
                loanAmount,
                interestOnLoan,
                annualRateOfInterest,
                dateLoanStarted,
                periodOfLoan,
                bankOfLoan
            });
            res.status(201).json({ message: 'Loan created successfully', loan });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
};
