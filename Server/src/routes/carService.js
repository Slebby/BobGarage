// File: src/routes/carService.js
// This will hold all endpoints for the CarService
// Car Service Routes
// Add service - /api/service/add
// Update service - /api/service/edit/:id
// Get All service - /api/service
// Get service by ID - /api/service/edit/:id
// Delete service - /api/service/delete/:id

const express = require('express');
const db = require('../models');

const { CarServices } = db.sequelize.models;

const router = express.Router();

// Get All service
// /api/service
// Get all the service from the database
// GET request
// Public route - Everyone can see the service
router.get('/', async (req, res) => {
    console.log('/api/service - GET');
    const allServices = await CarServices.findAll();

    res.send(allServices);
});

// Get service by ID
// /api/service/edit/:id
// Get one service by the id
// GET request
// Private route - only admin could get the service
router.get('/edit/:id', async (req, res) => {
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

// Add service
// /api/service/add
// Add the new service
// POST request
// Private route - only admin could add the service
router.post('/add', async (req, res) => {
    console.log('/api/service/add - POST');
    const { serviceName, serviceDesc, serviceImage, servicePrice } = req.body;

    const newService = await CarServices.create({ serviceName, serviceImage, serviceDesc, servicePrice });
    console.log(newService.toJSON());
    res.send(newService);
});

// Update service
// /api/service/edit/:id
// This will edit the endpoint
// PUT request
// Private route - only admin  could edit the service
router.put('/edit/:id', async (req, res) => {
    console.log('/api/service/edit/:id - PUT');
    const id = parseInt(req.params.id);
    const { serviceName, serviceDesc, serviceImage, servicePrice } = req.body;
    const editService = await CarServices.update({ serviceName, serviceImage, serviceDesc, servicePrice }, {
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

// Delete service
// /api/service/delete/:id
// delete the service from the database
// DELETE request
// Private route - only admin  could delete the service
router.delete('/delete/:id', async (req, res) => {
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

module.exports = router;