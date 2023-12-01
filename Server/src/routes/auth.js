// File: src/routes/auth.js
// This file hold all the authenticate endpoints.

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const db = require('../models');

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
        
        const payload = {
            user: {
                userId: userRes.userId,
                username: userRes.username,
                email: userRes.email,
                userImage: userRes.userImage,
                isStaff: userRes.isStaff
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

    }
});

module.exports = router;