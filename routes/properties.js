const express = require('express');
const model = require('../model');
const services = require('../services/properties');

const router = express.Router();

// Ruta para obtener datos de contabilidad
router.get('/getProperties', services.getDatap);

module.exports = router;
