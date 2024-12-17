'use strict';

const router = require('express').Router();
const Controller = require('../../../../controller/api/v1/user/login');
const multer = require('../../../../externalService/multer');



/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     tags:
 *       - Customers
 *     description: User login with email and password
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: credentials
 *         required: true
 *         description: User's login credentials
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *               description: User's email address
 *               example: Amjad@desolint.com
 *             password:
 *               type: string
 *               description: User's password
 *               example: 123456abc
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */

router.post('/', Controller.login)

module.exports = router;