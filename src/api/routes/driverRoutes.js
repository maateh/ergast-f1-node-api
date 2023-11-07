const express = require('express')

// controllers
const { getDrivers, getDriver } = require('../controllers/driver/driversController')
const { getDriversFilteredByResults } = require('../controllers/driver/filterDriversController')

// middlewares
const queryValidation = require('../middlewares/queryValidation')
const responsePagination = require('../middlewares/responsePagination')
const filterParser = require('../middlewares/filterParser')

const BASE_FILTER_ROUTE = '(/circuits/:circuitId)?(/teams/:teamId)?'

const router = express.Router()

// List of all drivers
router.get('/', [queryValidation, responsePagination], getDrivers)

// List of all drivers who match the specified filter
router.get(
  `${BASE_FILTER_ROUTE}(/race(/:position)?(/grid/:grid)?(/fastest/:fastest)?(/points/:points)?)?`,
  [responsePagination, filterParser],
  (req, res, next) => {
    getDriversFilteredByResults(req, res, next, 'race')
  }
)

router.get(
  `${BASE_FILTER_ROUTE}(/qualifying(/:position)?)?`,
  [responsePagination, filterParser],
  (req, res, next) => {
    getDriversFilteredByResults(req, res, next, 'qualifying')
  }
)

router.get(
  `${BASE_FILTER_ROUTE}(/sprint(/:position)?(/grid/:grid)?(/points/:points)?)?`,
  [responsePagination, filterParser],
  (req, res, next) => {
    getDriversFilteredByResults(req, res, next, 'sprint')
  }
)

// Get driver information
router.get('/:id', getDriver)

module.exports = router
