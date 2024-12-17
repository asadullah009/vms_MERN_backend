const User = require("../../../../models/User");
const jwt = require('jsonwebtoken');


module.exports = {
    login: async (req) => {
        try {
            const email = req.body.email;
            const password = req.body.password;

            const user = await User.findOne({ email });
            // If user is not found or password doesn't match
            if (!user || user.password !== password) {
                return { success: false, message: 'Invalid credentials' };
            }

            // Create the JWT payload (you can add more details as needed)
            const payload = {
                _id: user._id,
                email: user.email
            };

            // Generate JWT with a secret key and set the expiration time
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
            return { success: true, token };

        } catch (error) {
            return { success: false, message: 'Server error', error };
        }
    }
}