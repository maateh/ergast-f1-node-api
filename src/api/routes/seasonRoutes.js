const express = require('express')

// controllers
const { getSeasons, getSeason } = require('../controllers/season/seasonsController')
const { getSeasonsFilteredByResults } = require('../controllers/season/filterSeasonsController')

// middlewares
const queryValidation = require('../middlewares/queryValidation')
const responsePagination = require('../middlewares/responsePagination')
const filterParser = require('../middlewares/filterParser')

const BASE_FILTER_ROUTE = '(/circuits/:circuitId)?(/drivers/:driverId)?(/teams/:teamId)?'

const router = express.Router()

// List of all seasons
router.get('/', [queryValidation, responsePagination], getSeasons)

// List of all seasons which match the specified filter
router.get(
  `${BASE_FILTER_ROUTE}(/race(/:racePosition)?(/grid/:raceGrid)?(/fastest/:raceFastest)?(/points/:racePoints)?)?`,
  [responsePagination, filterParser],
  getSeasonsFilteredByResults
)

router.get(
  `${BASE_FILTER_ROUTE}(/qualifying(/:qualifyingPosition)?)?`,
  [responsePagination, filterParser],
  getSeasonsFilteredByResults
)

router.get(
  `${BASE_FILTER_ROUTE}(/sprint(/:sprintPosition)?(/grid/:sprintGrid)?(/points/:sprintPoints)?)?`,
  [responsePagination, filterParser],
  getSeasonsFilteredByResults
)

// Get season information
router.get('/:year', getSeason)

module.exports = router
