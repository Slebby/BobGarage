// File: src/routes/blog.js
// This will hold all endpoints that related to Blog

const express = require('express');
const db = require('../models');

const { Blog } = db.sequelize.models;

const router = express.Router();

// Blog Routes.
router.get('/', async (req, res) => {
    console.log('/api/blog - GET');
    
    const allBlogs = await Blog.findAll();
    res.send(allBlogs);
});

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

router.post('/add', async (req, res) => {
    console.log('/api/blog/add - POST');
    
    const { blogHeader, blogTitle, blogBody, myUserBlogId } = req.body;
    const newBlog = await Blog.create({ blogHeader, blogTitle, blogBody, myUserBlogId});

    console.log(newBlog.toJSON());
    res.send(newBlog);
});

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