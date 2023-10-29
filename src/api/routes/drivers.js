const express = require('express')

// controllers
const getAllDrivers = require('../controllers/drivers/getAllDrivers')
const getDriversWithinASeason = require('../controllers/drivers/getDriversWithinASeason')
const getDriversWithinAWeekend = require('../controllers/drivers/getDriversWithinAWeekend')
const getDriverInformation = require('../controllers/drivers/getDriverInformation')

// middlewares
const responsePagination = require('../middlewares/responsePagination')

const router = express.Router()

// List of all drivers
router.get('/', responsePagination, getAllDrivers)

// List of all drivers within a season
router.get('/year/:year', responsePagination, getDriversWithinASeason)

// List of all drivers within a weekend in a season
router.get('/year/:year/round/:round', responsePagination, getDriversWithinAWeekend)

// Get driver information
router.get('/:id', getDriverInformation)

module.exports = router
