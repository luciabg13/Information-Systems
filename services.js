const express = require('express');
const model = require('../model');
const services = require('../services/services');

const router = express.Router();

// Route to obtain services data
router.get('/getServices', services.getDatas);

// Route to filter the services
router.get('/filterServices', services.filterData);

// Route to upload CSV file of services data
router.post('/setServices', services.importData);

module.exports = router;