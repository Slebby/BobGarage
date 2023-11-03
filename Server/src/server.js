const express = require('express');
const config = require('./config/config');
const db = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const { Feedback, Blog, CarServices, User } = db.sequelize.models;

// Feedback Routes.
app.get('/api/feedback', async (req, res) => {
    console.log('/api/feedback - GET');

    const allFeedback = await Feedback.findAll();
    res.send(allFeedback);
});

app.get('/api/feedback/edit/:id', async (req, res) => {
    console.log('/api/feedback/edit/:id - GET');
    let id = req.params.id;
    id = parseInt(id);

    const oneFeedback = await Feedback.findByPk(id);

    if (oneFeedback === null){
        console.log('Feedback Not Found!');
        res.send('No Feedback item found');
    } else {
        console.log(`Feedback Found! \n${oneFeedback}`);
        res.send(oneFeedback);
    }
});

app.post('/api/feedback/add', async (req, res) => {
    console.log('/api/feedback/add - POST');

    const { feedbackBody, feedbackTitle, UserUserId } = req.body;

    const newFeedback = await Feedback.create({
        feedbackTitle,
        feedbackBody,
        UserUserId
    });
    console.log(newFeedback.toJSON());
    res.send(newFeedback);
});

app.put('/api/feedback/edit/:id', async (req, res) => {
    console.log('/api/feedback/edit/:id - PUT');
    let id = req.params.id;
    id = parseInt(id);

    const { feedbackBody, feedbackTitle, UserUserId } = req.body;

    const editFeedback = await Feedback.update({ feedbackTitle, feedbackBody, UserUserId }, { 
        where: {
            feedId: id
        }
    } );
    
    if (editFeedback == 1){
        console.log(`Update status: ${editFeedback}`);
        const existFeedback = await Feedback.findByPk(id);
        res.send(existFeedback);
    } else {
        console.log(`Update status: ${editFeedback}`);
        res.send('Feedback failed to update!');
    }
});

app.delete('/api/feedback/delete/:id', async (req, res) => {
    console.log('/api/feedback/delete/:id - DELETE');
    let id = req.params.id;
    id = parseInt(id);

    const deleteFeedback = await Feedback.destroy({
        where: {
            feedId: id
        }
    });
    if (deleteFeedback == 1){
        console.log('Feedback delete failed');
        res.send('Feedback has been deleted!');
    } else {
        console.log('Feedback delete success');
        res.send('Feedback failed to delete!');
    }
});

// Blog Routes.
app.get('/api/blog', async (req, res) => {
    console.log('/api/blog - GET');
    
    const allBlogs = await Blog.findAll();
    res.send(allBlogs);
});

app.get('/api/blog/edit/:id', async (req, res) => {
    console.log('/api/blog/edit/:id - GET');
    let id = req.params.id;
    id = parseInt(id);

    const oneBlog = await Blog.findByPk(id);

    if(oneBlog === null){
        console.log('Blog Not Found!');
        res.send('No Blog item found!');
    } else {
        console.log('Blog Found!');
        res.send(oneBlog);
    }
});

app.post('/api/blog/add', async (req, res) => {
    console.log('/api/blog/add - POST');
    
    const { blogHeader, blogTitle, blogBody, UserUserId } = req.body;
    const newBlog = await Blog.create({ blogHeader, blogTitle, blogBody, UserUserId});

    console.log(newBlog.toJSON());
    res.send(newBlog);
});

app.put('/api/blog/edit/:id', async (req, res) => {
    console.log('/api/blog/edit/:id - PUT');
    let id = req.params.id;
    id = parseInt(id);

    const { blogHeader, blogTitle, blogBody, UserUserId } = req.body;
    const editBlog = await Blog.update({ blogHeader, blogTitle, blogBody, UserUserId }, {
        where: {
            blogId: id
        }
    });
    
    if (editBlog == 0) {
        console.log('Blog Update Failed!');
        res.send('Blog failed to update');
    } else {
        console.log('Blog Update Success!');
        const existBlog = await Blog.findByPk(id);
        res.send(existBlog);
    }
});

app.delete('/api/blog/delete/:id', async (req, res) => {
    console.log('/api/blog/delete/:id - DELETE');
    let id = req.params.id;
    id = parseInt(id);

    const deleteBlog = await Blog.destroy({
        where: {
            blogId: id
        }
    });
    
    if (deleteBlog == 0) {
        console.log('Blog delete Failed!');
        res.send('Blog failed to delete!');
    } else {
        console.log('Blog delete Success!');
        res.send('Blog has been deleted!');
    }
});

// Car Service Routes
app.get('/api/service', async (req, res) => {
    console.log('/api/service - GET');
    const allServices = await CarServices.findAll();

    res.send(allServices);
});

app.get('/api/service/edit/:id', async (req, res) => {
    console.log('/api/service/edit/:id - GET');
    const id = parseInt(req.params.id);

    const oneService = await CarServices.findByPk(id);

    if (oneService === 0) {
        console.log('Service not found!');
        res.send('No Service Found!');
    } else {
        console.log('One Service found!');
        res.send(oneService);
    }
});

app.post('/api/service/add', async (req, res) => {
    console.log('/api/service/add - POST');
    const { serviceName, serviceDesc, serviceImage } = req.body;

    const newService = await CarServices.create({ serviceName, serviceImage, serviceDesc });
    console.log(newService.toJSON());
    res.send(newService);
});

app.put('/api/service/edit/:id', async (req, res) => {
    console.log('/api/service/edit/:id - PUT');
    const id = parseInt(req.params.id);
    const { serviceName, serviceDesc, serviceImage } = req.body;
    const editService = await CarServices.update({ serviceName, serviceImage, serviceDesc }, {
        where: {
            serviceId: id
        }
    });

    if (editService === 0) {
        console.log('Service Update Failed');
        res.send('Failed to update Service Data!');
    } else {
        console.log('Service Update Success');
        const existService = await CarServices.findByPk(id);
        res.send(existService);
    }
});

app.delete('/api/service/delete/:id', async (req, res) => {
    console.log('/api/service/delete/:id - DELETE');
    const id = parseInt(req.params.id);
    const deleteService = await CarServices.destroy({where: { serviceId: id }});

    if (deleteService === 0) {
        console.log('Service Delete Failed');
        res.send('Failed to delete Service Data!');
    } else {
        console.log('Service Delete Success');
        res.send('Scceed to delete Service Data');
    }
});

// User routes
// Login Route
// Allow user to login
// /api/user
// POST Request
// Public route
app.post('/api/user', async (req, res) => {
    console.log('/api/user - POST');
    const { email, password } = req.body;
    try {
        // Check if the user exists
        const user = await User.findOne({ where: { email }});
        
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

// Register Route
// ALlow user to sign up
// /api/user/new
// POST request
// Public route
app.post('/api/user/new', async (req, res) => {
    console.log('/api/user/new - POST');
    const { username, email, userImage, password } = req.body;

    try {
        const user = await User.findOne({ where: { email }});
    
        if(user){
            return res.status(400).json({ errors: [{ msg: 'User already registered' }]});
        }
        
        const newUser = {
            username,
            email,
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

db.sequelize.sync({ alter: true }).then(() => {
    app.listen(config.port,
        () => console.log(`Server is running on port: ${config.port}`)
    );
});
