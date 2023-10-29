const express = require('express')

// controllers
const controller = require('../controllers/drivers')

// middlewares
const responsePagination = require('../middlewares/responsePagination')

const router = express.Router()

// List of all drivers
router.get('/', responsePagination, controller.getAllDrivers)

// List of all drivers within a season
router.get('/year/:year', responsePagination, controller.getDriversWithinASeason)

// List of all drivers within a weekend in a season
router.get('/year/:year/round/:round', responsePagination, controller.getDriversWithinAWeekend)

// Driver information
router.get('/:id', controller.getDriverInformation)

module.exports = router
