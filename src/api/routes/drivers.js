const express = require('express')

const controller = require('../controllers/drivers')

const router = express.Router()

// List of all drivers
router.get('/', controller.getAllDrivers)

// Driver information
router.get('/:id', controller.getDriverInformation)

// List of all drivers within a season
router.get('/year/:year', controller.getDriversWithinASeason)

// List of all drivers within a weekend in a season
router.get('/year/:year/round/:round', controller.getDriversWithinAWeekend)

module.exports = router
