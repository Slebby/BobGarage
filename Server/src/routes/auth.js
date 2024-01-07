// File: src/routes/auth.js
// This file hold all the authenticate endpoints.

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const db = require('../models');
const { sendingEmail } = require('../utils/emailService');

const auth = require('../middleware/auth');

const router = express.Router();
const { User } = db.sequelize.models;

// User routes
// Login Route
// Allow user to login
// /api/auth
// POST Request
// Public route
router.post('/', async (req, res) => {
    console.log('/api/auth - POST');
    const { email, password } = req.body;
    try {
        // Check if the user exists
        const user = await User.findOne({ where: { email: email.toUpperCase() }});
        
        // if not there send a message
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }]});
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }]});
        }

        const payload = {
            user: {
                userId: user.userId,
                username: user.username,
                email: user.email,
                userImage: user.userImage,
                isStaff: user.isStaff
            }
        };

        jwt.sign(payload, config.auth.jwtSecret, 
            {
                expiresIn: '7d',
                algorithm: 'HS512'
            },
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }
        );

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
})

// Get the logged in user.
// /api/auth
// Private route (must be logged in)
router.get('/', auth, async(req, res) => {
    console.log('/api/auth - GET');
    const options = {
        attributes: { exclude: ['password'] }
    };
    
    try {
        const user = await User.findByPk(req.user.userId, options);
        console.log(user);
        res.send(user);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// Register Route
// ALlow user to sign up
// /api/auth/new
// POST request
// Public route
router.post('/new', async (req, res) => {
    console.log('/api/auth/new - POST');
    const { username, email, userImage, password } = req.body;

    try {
        const user = await User.findOne({ where: { email: email.toUpperCase() }});
    
        if(user){
            return res.status(400).json({ errors: [{ msg: 'User already registered' }]});
        }
        
        const newUser = {
            username,
            email: email.toUpperCase(),
            userImage,
            password
        };

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        // console.log(newUser);

        const userRes = await User.create({
            username: newUser.username,
            email: newUser.email,
            userImage: newUser.userImage,
            password: newUser.password,
        });
        
        const emailPayload = {
            type: 'sendEmailWithToken',
            userId: userRes.userId,
            username: userRes.username,
            email: userRes.email,
        };

        const userPayload = {
            userId: userRes.userId,
            username: userRes.username,
            email: userRes.email,
            email_Verified: userRes.email_Verified
        };

        await sendingEmail(emailPayload);

        res.send(userPayload);
    } catch (error) {
        console.error(error.message);

    }
});

// Email Verify Route
// User's email will be verify. if there's no token the server will send a new token though the email.
// /api/auth/verify
// POST request
// Public route
router.post('/verify', async (req, res) => {
    console.log('/api/auth/verify - POST');
    try {
        const token = req.body.token;
        console.log(token);
    
        if(!token) {
            return res.status(400).json({ error: 'Invalid Token' });
        }
    
        const decoded = jwt.verify(token, config.auth.jwtSecret);
        console.log(decoded);
    
        const foundUser = await User.findByPk(decoded.userId);    
        
        if(!foundUser){
            return res.status(400).send('User not found.');
        }
        
        await User.update({ email_Verified: true }, {
            where: {
                userId: decoded.userId
            }
        });
        
        const payload = {
            user: {
                userId: foundUser.userId,
                username: foundUser.username,
                email: foundUser.email,
                userImage: foundUser.userImage,
                isStaff: foundUser.isStaff,
                email_Verified: foundUser.email_Verified
            }
        };
    
        jwt.sign(payload, config.auth.jwtSecret, 
            {
                expiresIn: '7d',
                algorithm: 'HS512'
            },
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }
        );
    } catch (error) {
        console.log(error.message);
    }
});

// Resend Email Verify Route
// User's email will be verify again.
// /api/auth/resend
// POST request
// Public route
router.post('/resend', async (req, res) => {
    console.log('/api/auth/resend - POST');
    try {
        const { userId, username, email } = req.body;
        const emailPayload = {
            type: 'resendEmailWithToken',
            userId,
            username,
            email
        };

        await sendingEmail(emailPayload);
        res.send('<p>Verification Email Resent</p>');
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;