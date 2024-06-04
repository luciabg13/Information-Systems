const express = require('express');
const model = require('../model');
const services = require('../services/leases');

const router = express.Router();

// Ruta para obtener datos de contabilidad
router.get('/getLeases', services.getLease);
router.post('/postLease', services.postLease);

module.exports = router;