// File: src/routes/feedback.js
// all Feedback routes are stored here mostly dealing with feedback.
// Feedback Routes.
// Add Feedback - /api/feedback/add
// Update Feedback - /api/feedback/edit/:id
// Get All Feedback - /api/feedback
// Get Feedback by ID - /api/feedback/edit/:id
// Delete Feedback - /api/feedback/delete/:id

const express = require('express');
const db = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

const { Feedback } = db.sequelize.models;

// Get All Feedback
// /api/feedback
// Get all the feedback from the database
// GET request
// Public route - Everyone can see the feedback
router.get('/', async (req, res) => {
    console.log('/api/feedback - GET');

    const allFeedback = await Feedback.findAll();
    res.send(allFeedback);
});

// Get Feedback by ID
// /api/feedback/edit/:id
// Get one feedback by the id
// GET request
// Private route - only auth and the owner could get the feedback
router.get('/edit/:id', auth, async (req, res) => {
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

// Add Feedback
// /api/feedback/add
// Add the new feedback
// POST request
// Private route - auth and could add the feedback
router.post('/add', auth, async (req, res) => {
    console.log('/api/feedback/add - POST');

    const { feedbackBody, feedbackTitle, feedbackImage, myUserFeedbackId } = req.body;

    const newFeedback = await Feedback.create({
        feedbackTitle,
        feedbackBody,
        myUserFeedbackId,
        feedbackImage
    });
    console.log(newFeedback.toJSON());
    res.send(newFeedback);
});

// Update feedback
// /api/feedback/edit/:id
// This will edit the endpoint
// PUT request
// Private route - only auth and the owner could edit the feedback
router.put('/edit/:id', auth, async (req, res) => {
    console.log('/api/feedback/edit/:id - PUT');
    let id = req.params.id;
    id = parseInt(id);

    const { feedbackBody, feedbackTitle, myUserFeedbackId } = req.body;

    const editFeedback = await Feedback.update({ feedbackTitle, feedbackBody, myUserFeedbackId }, { 
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

// Delete Feedback
// /api/feedback/delete/:id
// delete the feedback from the database
// DELETE request
// Private route - only auth, admin and the owner could delete the feedback
router.delete('/delete/:id', auth, async (req, res) => {
    console.log('/api/feedback/delete/:id - DELETE');
    let id = req.params.id;
    id = parseInt(id);

    const deleteFeedback = await Feedback.destroy({
        where: {
            feedId: id
        }
    });
    if (deleteFeedback != 1){
        console.log('Feedback delete failed');
        res.send('Feedback has been deleted!');
    } else {
        console.log('Feedback delete success');
        res.send('Feedback failed to delete!');
    }
});

module.exports = router;