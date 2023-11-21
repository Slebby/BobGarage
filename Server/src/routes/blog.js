// File: src/routes/blog.js
// This will hold all endpoints that related to Blog
// Blog Routes.
// Add blog - /api/blog/add
// Update blog - /api/blog/edit/:id
// Get All blog - /api/blog
// Get blog by ID - /api/blog/edit/:id
// Delete blog - /api/blog/delete/:id

const express = require('express');
const db = require('../models');

const { Blog } = db.sequelize.models;

const router = express.Router();

// Get All blog
// /api/blog
// Get all the blog from the database
// GET request
// Public route - Everyone can see the blog
router.get('/', async (req, res) => {
    console.log('/api/blog - GET');
    
    const allBlogs = await Blog.findAll();
    res.send(allBlogs);
});

// Get blog by ID
// /api/blog/edit/:id
// Get one blog by the id
// GET request
// Private route - only auth and the owner could get the blog
router.get('/edit/:id', async (req, res) => {
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

// Add blog
// /api/blog/add
// Add the new blog
// POST request
// Private route - auth and could add the blog
router.post('/add', async (req, res) => {
    console.log('/api/blog/add - POST');
    
    const { blogHeader, blogTitle, blogBody, myUserBlogId, blogImage } = req.body;
    const newBlog = await Blog.create({ blogHeader, blogTitle, blogBody, myUserBlogId, blogImage});

    console.log(newBlog.toJSON());
    res.send(newBlog);
});

// Update blog
// /api/blog/edit/:id
// This will edit the endpoint
// PUT request
// Private route - only auth and the owner could edit the blog
router.put('/edit/:id', async (req, res) => {
    console.log('/api/blog/edit/:id - PUT');
    let id = req.params.id;
    id = parseInt(id);

    const { blogHeader, blogTitle, blogBody, myUserBlogId } = req.body;
    const editBlog = await Blog.update({ blogHeader, blogTitle, blogBody, myUserBlogId }, {
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

// Delete blog
// /api/blog/delete/:id
// delete the blog from the database
// DELETE request
// Private route - only auth, admin and the owner could delete the blog
router.delete('/delete/:id', async (req, res) => {
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

module.exports = router;