'use strict';
const router = require('express').Router();

const login = require('./login.routes');
const vehicleRoutes = require('./vehicle.routes')

router.use('/vehicle', vehicleRoutes)
router.use('/login', login);

module.exports = router;