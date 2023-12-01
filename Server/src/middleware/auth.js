// File: src/middleware/auth.js
// This middleware will check if we have a token or not and pass messages based on this.
// We will need JWT and our JWT Secret.
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Create our export function
module.exports = function (req, res, next){
    // Get the token from http header;
    const token = req.header('bobgarage-auth-token');
    console.log('Middleware Token');
    console.log(token);

    // Check if there is a token
    if(!token){
        // If there is no token, send that the user is not autoriseed for this route.
        console.log('No Token');
        return res.status(401).json({errors: [{ msg: 'Authorisation Denied'}]});
    }

    // Verify the token
    try {
        console.log('Decoding Token...');
        const decoded = jwt.verify(token, config.auth.jwtSecret);
        req.user = decoded.user;
        console.log(req.user);
        next();
    } catch (err) {
        res.status(401).json({ errors : [{ msg: 'Not Valid' }]});
    }
}