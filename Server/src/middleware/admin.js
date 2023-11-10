// File: src/middleware/admin.js
// This middleware will test for admin users
// Will help secure routes for admin only users

// Create our middleware function
module.exports = function(req, res, next){
    // Check that we have req.user
    console.log('req.user');
    console.log(req.user);
    // Note that req.user is set by our auth middleware from our decoded token. This middle needs to run after the auth middleware.
    if(!req.user.isStaff){
        return res.status(403).json({ errors: [{ msg: 'Access Denied' }]});
    }
    next();
};