// File src/routes/users.js
// This endpoint hold all crud related to users.

const express = require('express');
const db = require('../models');

const { User, Feedback, Blog } = db.sequelize.models;

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

// Get all users route
// return all users
// /api/users
// GET Request
// Private route (auth & staff)
router.get('/', [auth, admin] ,async(req, res) => {
    console.log('/api/users - GET');
    const options = {
        attributes: { exclude: ['password'] }
    };
    const userList = await User.findAll(options);
    res.send(userList);
});

// Get users Names
// return users names and such
// /api/users/names
// GET Request
// Public route - will shown on the feedback and blog
router.get('/names', async(req, res) => {
    console.log('/api/users/names - GET');
    const options = {
        attributes: { exclude: ['password', 'email', 'isStaff'] }
    };
    const userList = await User.findAll(options);
    res.send(userList);
});

// Delete user Names
// Remove user
// /api/users/delete/:id
// DELETE Request
// Private route - Only the admin delete
router.delete('/delete/:id', async(req, res) => {
    console.log('/api/users/delete/:id - DELETE');
    const id = parseInt(req.params.id);

    const removingUserFeedback = await Feedback.update({ myUserFeedbackId: null } ,{
        where: {
            myUserFeedbackId: id
        }
    });

    const removingUserBlog = await Blog.update({ myUserBlogId: null }, {
        where: {
            myUserBlogId: id
        }
    });

    const removingUser = await User.destroy({ 
        where: {
            userId: id
        }
    });

    if (removingUser == 0 || removingUserFeedback == 0 || removingUserBlog == 0) {
        console.log('User delete Failed!');
        res.send('User failed to delete!');
    } else {
        console.log('User delete Success!');
        res.send('User has been deleted!');
    }
});

module.exports = router;