const axios = require('axios');
const db = require("../models");
const User = db.user;

const facebookLogin = async (req, res) => {
    const { accessToken } = req.body;

    try {
        // Verify the access token with Facebook
        const response = await axios.get(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email`);
        const profile = response.data;

        // Check if user exists in the database
        let user = await User.findOne({ where: { facebookId: profile.id } });
        if (!user) {
            // Create a new user if not exists
            user = await User.create({
                facebookId: profile.id,
                fullName: profile.name,
                email: profile.email,
            });
        }

        // Generate a JWT token using the instance method
        const token = user.generateJwtToken();

        // Respond with user data and token
        res.json({ user, token });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in with Facebook', error: err.message });
    }
};

const signup = async (req, res) => {
    const { community, fullName, houseNo, countryCode, phone, pinCode, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        user = await User.create({
            community,
            fullName,
            houseNo,
            countryCode,
            phone,
            pinCode,
            email,
            password: hashedPassword,
        });

        // Generate a JWT token using the instance method
        const token = user.generateJwtToken();

        // Respond with user data and token
        res.status(201).json({ user, token });
    } catch (err) {
        res.status(500).json({ message: 'Error signing up user', error: err.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: user.id, fullName: user.fullName }, SECRET_KEY, { expiresIn: '1h' });
  
      // Respond with token
      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: 'Error logging in', error: err.message });
    }
  };

module.exports = { facebookLogin, signup, login };
