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

app.get('/api/feedback/edit/:id', (req, res) => {
    console.log('/api/feedback/edit/:id - GET');

    res.send('Get One Feedback, GET REQUEST');
});

app.post('/api/feedback/add', (req, res) => {
    console.log('/api/feedback/add - POST')
    res.send('Add Feedback - POST REQUEST');
});

app.put('/api/feedback/edit/:id', (req, res) => {
    console.log('/api/feedback/edit/:id - PUT');

    res.send('/api/feedback/edit/:id - PUT REQUEST')
});

app.delete('/api/feedback/delete/:id', (req, res) => {
    console.log('/api/feedback/delete/:id - DELETE');
    
    res.send('/api/feedback/delete/:id - DELETE REQUEST');
});

db.sequelize.sync().then(() => {
    app.listen(config.port,
        () => console.log(`Server is running on port: ${config.port}`)
    );
});
