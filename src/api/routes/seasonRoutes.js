const express = require('express')

// controllers
const { getSeasonsController, getSeasonController } = require('../controllers/season/seasonsController')
const { getPopulatedSeasonsFilteredByResults } = require('../controllers/season/filterSeasonsController')

// middlewares
const queryValidation = require('../middlewares/queryValidation')
const responsePagination = require('../middlewares/responsePagination')
const filterParser = require('../middlewares/filterParser')

const BASE_FILTER_ROUTE = '(/circuits/:circuitId)?(/drivers/:driverId)?(/teams/:teamId)?'

const router = express.Router()

// List of all seasons
router.get('/', [queryValidation, responsePagination], getSeasonsController)

// List of all seasons which match the specified filter
router.get(
  `${BASE_FILTER_ROUTE}(/race(/:position)?(/grid/:grid)?(/fastest/:fastest)?(/points/:points)?)?`,
  [responsePagination, filterParser],
  (req, res, next) => {
    getPopulatedSeasonsFilteredByResults(req, res, next, 'race')
  }
)

router.get(
  `${BASE_FILTER_ROUTE}(/qualifying(/:position)?)?`,
  [responsePagination, filterParser],
  (req, res, next) => {
    getPopulatedSeasonsFilteredByResults(req, res, next, 'qualifying')
  }
)

router.get(
  `${BASE_FILTER_ROUTE}(/sprint(/:position)?(/grid/:grid)?(/points/:points)?)?`,
  [responsePagination, filterParser],
  (req, res, next) => {
    getPopulatedSeasonsFilteredByResults(req, res, next, 'sprint')
  }
)

// Get season information
router.get('/:year', getSeasonController)

module.exports = router
