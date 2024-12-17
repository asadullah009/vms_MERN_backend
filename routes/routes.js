'use strict';

const router = require('express').Router();

const userRoutes = require('./api/v1/user/route');


router.use('/', userRoutes);

module.exports = router;