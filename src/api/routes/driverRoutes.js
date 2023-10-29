const express = require('express')

// controllers
const getDriversController = require('../controllers/driver/getDriversController')
const getSeasonDriversController = require('../controllers/driver/getSeasonDriversController')
const getWeekendDriversController = require('../controllers/driver/getWeekendDriversController')
const getDriverController = require('../controllers/driver/getDriverController')

// middlewares
const responsePagination = require('../middlewares/responsePagination')

const router = express.Router()

// List of all drivers
router.get('/', responsePagination, getDriversController)

// List of all drivers within a season
router.get('/year/:year', responsePagination, getSeasonDriversController)

// List of all drivers within a weekend in a season
router.get('/year/:year/round/:round', responsePagination, getWeekendDriversController)

// Get driver information
router.get('/:id', getDriverController)

module.exports = router
