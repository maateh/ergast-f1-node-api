const express = require('express')

// controllers
const { getWeekendsController, getWeekendController } = require('../controllers/weekend/weekendsController')
const { getPopulatedWeekendsFilteredByResults } = require('../controllers/weekend/filterWeekendsController')

// middlewares
const queryValidation = require('../middlewares/queryValidation')
const responsePagination = require('../middlewares/responsePagination')
const filterParser = require('../middlewares/filterParser')

const BASE_FILTER_ROUTE = '(/circuits/:circuitId)?(/drivers/:driverId)?(/teams/:teamId)?'

const router = express.Router()

// List of all weekends
router.get('/', [queryValidation, responsePagination], getWeekendsController)

// List of all weekends which match the specified filter
router.get(
  `${BASE_FILTER_ROUTE}(/race(/:position)?(/grid/:grid)?(/fastest/:fastest)?(/points/:points)?)?`,
  [responsePagination, filterParser],
  (req, res, next) => {
    getPopulatedWeekendsFilteredByResults(req, res, next, 'race')
  }
)

router.get(
  `${BASE_FILTER_ROUTE}(/qualifying(/:position)?)?`,
  [responsePagination, filterParser],
  (req, res, next) => {
    getPopulatedWeekendsFilteredByResults(req, res, next, 'qualifying')
  }
)

router.get(
  `${BASE_FILTER_ROUTE}(/sprint(/:position)?(/grid/:grid)?(/points/:points)?)?`,
  [responsePagination, filterParser],
  (req, res, next) => {
    getPopulatedWeekendsFilteredByResults(req, res, next, 'sprint')
  }
)

// Get weekend information
router.get('/:year/:round', getWeekendController)

module.exports = router
