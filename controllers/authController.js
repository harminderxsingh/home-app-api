const bcrypt = require('bcrypt')
const { User } = require("../models");
const { sendPassword } = require('../services/smsService');


// const facebookLogin = async (req, res) => {
//     const { accessToken } = req.body;

//     try {
//         // Verify the access token with Facebook
//         const response = await axios.get(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email`);
//         const profile = response.data;

//         // Check if user exists in the database
//         let user = await User.findOne({ where: { facebookId: profile.id } });
//         if (!user) {
//             // Create a new user if not exists
//             user = await User.create({
//                 facebookId: profile.id,
//                 fullName: profile.name,
//                 email: profile.email,
//             });
//         }

//         // Generate a JWT token using the instance method
//         const token = user.generateJwtToken();

//         // Respond with user data and token
//         res.json({ user, token });
//     } catch (err) {
//         res.status(500).json({ message: 'Error logging in with Facebook', error: err.message });
//     }
// };

const signup = async (req, res) => {
    const { communityId, fullName, houseNo, countryCode, phone, customerNumber } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ where: { communityId, houseNo } });
        if (user) {
            return res.status(400).json({ message: 'User already exists with this house number' });
        }

        // const password = (Math.floor(1000 + Math.random() * 9000)).toString();
        const password = '1234';

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        user = await User.create({
            fullName,
            communityId,
            houseNo,
            countryCode,
            phone,
            customerNumber,
            password: hashedPassword,
        });
        sendPassword(phone, password)
        // Respond with user data and token
        res.status(201).json({ user: user.toJSON() });
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error signing up user', error: err.message });
    }
};

const login = async (req, res) => {
    const { communityId, houseNo, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ where: { communityId, houseNo } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = user.generateJwtToken();

        // Respond with token
        res.json({ token, user: user.toJSON() });
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};

const updateProfile = async (req, res) => {
    const { occupation, age, interests, householdSize, pets, accessibility } = req.body;
    const { id } = req.user
    try {
        // Check if user already exists
        let user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await user.update({
            occupation,
            age: isNaN(age) ? null : parseInt(age),
            interests,
            householdSize: isNaN(householdSize) ? null : parseInt(householdSize),
            pets,
            accessibility,
        });

        // Respond with user data and token
        res.status(200).json({ user: user.toJSON() });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'An error occurred while updating the profile', error: err.message });
    }
};

const updateNotification = async (req, res) => {
    const { housePurchasedDate, solarPanelCleanedDate, septicTankCleanedDate } = req.body;
    const { id } = req.user
    try {
        // Check if user already exists
        let user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await user.update({
            housePurchasedDate,
            solarPanelCleanedDate,
            septicTankCleanedDate,
        });

        // Respond with user data and token
        res.status(200).json({ user: user.toJSON() });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'An error occurred while updating the profile', error: err.message });
    }
};

module.exports = { signup, login, updateProfile, updateNotification };
