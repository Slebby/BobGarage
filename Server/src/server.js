const express = require('express');
const config = require('./config/config');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Feedback Routes.
app.get('/api/feedback', (req, res) => {
    console.log('/api/feedback - GET');

    res.send('Get All Feedback, GET REQUEST');
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

app.listen(config.port, () => console.log(`Server is running on port: ${config.port}`));