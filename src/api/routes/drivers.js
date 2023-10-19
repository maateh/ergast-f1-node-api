const express = require('express')

const controller = require('../controllers/drivers')

const router = express.Router()

// List of all drivers
router.get('/', controller.getAllDrivers)

// Driver information
router.get('/:id', controller.getDriverInformation)

// List of all drivers within a year
router.get('/year/:year', controller.getDriversWithinAYear)

// List of all drivers within a race in a year
router.get('/year/:year/round/:round', controller.getDriversWithinARace)

module.exports = router
