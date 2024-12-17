'use strict';

const router = require('express').Router();
const Controller = require('../../../../controller/api/v1/user/vehicle');
const uploadMiddleware = require('../../../../middleware/multer');
const tokenValidator = require('../../../../middleware/tokenValidator');


/**
 * @swagger
 * /api/v1/vehicle:
 *   get:
 *     tags:
 *       - Vehicles
 *     description: Get all vehicles for the authenticated user
 *     security:
 *       - BearerAuthentication: []
 *     responses:
 *       200:
 *         description: A list of vehicles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 *       401:
 *         description: Unauthorized. Token missing or invalid.
 *       500:
 *         description: Internal server error
 */
router.get('/', tokenValidator, Controller.list);


/**
 * @swagger
 * /api/v1/vehicle:
 *   post:
 *     tags:
 *       - Vehicles
 *     description: Add a new vehicle with its details
 *     security:
 *       - BearerAuthentication: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: model
 *         type: string
 *         required: true
 *         description: The model of the vehicle
 *         example: Tesla Model S
 *       - in: formData
 *         name: price
 *         type: number
 *         format: float
 *         required: true
 *         description: The price of the vehicle
 *         example: 79999.99
 *       - in: formData
 *         name: phone
 *         type: string
 *         required: true
 *         description: The contact phone number for inquiries
 *         example: "+1 234 567 890"
 *       - in: formData
 *         name: city
 *         type: string
 *         required: true
 *         description: The city where the vehicle is located
 *         example: New York
 *       - in: formData
 *         name: images
 *         type: array
 *         items:
 *           type: file
 *         required: true
 *         description: Images of the vehicle
 *     responses:
 *       200:
 *         description: Vehicle added successfully
 *       400:
 *         description: Invalid input or missing required fields
 *       500:
 *         description: Internal server error
 */

router.post('/',tokenValidator,uploadMiddleware,  Controller.create)

module.exports = router;