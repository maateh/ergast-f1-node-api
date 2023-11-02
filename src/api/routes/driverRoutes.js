const express = require('express')

// controllers
const getDriversController = require('../controllers/driver/getDriversController')
const getFilterDriversController = require('../controllers/driver/getFilterDriversController')
const getDriverController = require('../controllers/driver/getDriverController')

// middlewares
const queryValidation = require('../middlewares/queryValidation')
const responsePagination = require('../middlewares/responsePagination')

const router = express.Router()

// List of all drivers
router.get('/', [queryValidation, responsePagination], getDriversController)

// List of all drivers who match the specified filter
router.get([
  '(/circuits/:circuitId)?(/teams/:teamId)?(/year/:year)?',
  '(/circuits/:circuitId)?(/teams/:teamId)?(/year/:year/round/:round)?'
], responsePagination, getFilterDriversController)

// Get driver information
router.get('/:id', getDriverController)

module.exports = router
