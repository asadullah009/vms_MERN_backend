'use strict';

const vehicleService = require('../../../../services/api/v1/user/vehicle.service')
module.exports = {
    create: async (req, res) => {
        try {
            const data = await vehicleService.create(req);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    list: async (req, res) => {
        try {
            const data = await vehicleService.list(req);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}