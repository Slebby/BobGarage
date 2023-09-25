const express = require('express');
const config = require('./config/config');
const db = require('./models');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const { Feedback, Blog, User, CarService } = db.sequelize.models;

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
        res.send('Feedback has been updated!');
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
        res.send('Blog failed to update!');
    } else {
        console.log('Blog Update Success!');
        res.send('Blog has been updated!');
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
    const allServices = await CarService.findAll();

    res.send(allServices);
});

app.get('/api/service/edit/:id', async (req, res) => {
    console.log('/api/service/edit/:id - GET');
    const id = parseInt(req.params.id);

    const oneService = await CarService.findByPk(id);

    if (oneService === 0) {
        console.log('Service not found!');
        res.send('No Service Found!');
    } else {
        console.log('One Service found!');
        res.send('Service Found!');
    }
});

app.post('/api/service/add', async (req, res) => {
    console.log('/api/service/add - POST');
    const { serviceName, serviceDesc, serviceImage } = req.body;

    const newService = await CarService.create({ serviceName, serviceImage, serviceDesc });
    console.log(newService.toJSON());
    res.send(newService);
});

app.put('/api/service/edit/:id', async (req, res) => {
    console.log('/api/service/edit/:id - PUT');
    const id = parseInt(req.params.id);
    const { serviceName, serviceDesc, serviceImage } = req.body;
    const editService = await CarService.update({ serviceName, serviceImage, serviceDesc }, {
        where: {
            serviceId: id
        }
    });

    if (editService === 0) {
        console.log('Service Update Failed');
        res.send('Failed to update Service Data!');
    } else {
        console.log('Service Update Success');
        res.send('Succeed to update Service Data');
    }
});

app.delete('/api/service/delete/:id', async (req, res) => {
    console.log('/api/service/delete/:id - DELETE');
    const id = parseInt(req.params.id);
    const deleteService = await CarService.destroy({where: { serviceId: id }});

    if (deleteService === 0) {
        console.log('Service Delete Failed');
        res.send('Failed to delete Service Data!');
    } else {
        console.log('Service Delete Success');
        res.send('Scceed to delete Service Data');
    }
});

db.sequelize.sync().then(() => {
    app.listen(config.port,
        () => console.log(`Server is running on port: ${config.port}`)
    );
});
