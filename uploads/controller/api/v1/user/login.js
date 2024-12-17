'use strict';

const authService = require('../../../../services/api/v1/user/login.service');

module.exports = {
    login: async (req, res) => {
        try {
            const data = await authService.login(req);

        if (!data.success) {
            return res.status(400).json({ message: data.message });
        }

        // Log the token or response
        return res.status(200).json({ token: data.token });
        } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    
        }
    }
}