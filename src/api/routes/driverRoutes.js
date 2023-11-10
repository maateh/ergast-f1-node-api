const express = require('express')

// controllers
const { getDrivers, getDriver } = require('../controllers/driver/driversController')
const { getDriversFilteredByResults } = require('../controllers/driver/filterDriversController')

// middlewares
const queryValidation = require('../middlewares/queryValidation')
const responsePagination = require('../middlewares/responsePagination')
const filterParser = require('../middlewares/filterParser')

// constants
const { ROUTE_FILTERS: { circuits, teams, results } } = require('../config/constants')

const router = express.Router()

// List of all drivers
router.get('/', [queryValidation, responsePagination], getDrivers)

// List of all drivers who match the specified filter
router.get(
  `${circuits}${teams}${results.race}${results.qualifying}${results.sprint}`,
  [responsePagination, filterParser],
  getDriversFilteredByResults
)

// Get driver information
router.get('/:id', getDriver)

module.exports = router
