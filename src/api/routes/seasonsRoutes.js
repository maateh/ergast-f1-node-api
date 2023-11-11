const express = require('express')

// controllers
const { getSeasons, getSeason } = require('../controllers/seasons/seasonsController')
const { getSeasonsFilteredByResults } = require('../controllers/seasons/filterSeasonsController')

// middlewares
const queryValidation = require('../middlewares/queryValidation')
const responsePagination = require('../middlewares/responsePagination')
const filterParser = require('../middlewares/filterParser')

// constants
const { ROUTE_FILTERS: { circuits, drivers, teams, results } } = require('../config/constants')

const router = express.Router()

// List of all seasons
router.get('/', [queryValidation, responsePagination], getSeasons)

// List of all seasons which match the specified filter
router.get(
  `${circuits}${drivers}${teams}${results.race}${results.qualifying}${results.sprint}`,
  [responsePagination, filterParser],
  getSeasonsFilteredByResults
)

// Get season information
router.get('/:year', getSeason)

module.exports = router
