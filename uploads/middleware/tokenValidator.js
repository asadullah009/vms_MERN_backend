const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authorizationHeaders = req.headers.authorization || req.headers.Authorization;
    
    const jwtToken = authorizationHeaders ? authorizationHeaders.split('Bearer ')[1] : '';
    
    if (!jwtToken) {
        return res.status(401).json({ message: 'No token provided, authorization denied.' });
    }

    jwt.verify(jwtToken, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token is not valid.' });
        }

        req.token = decoded;

        next();
    });
};
