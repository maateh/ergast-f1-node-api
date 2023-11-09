const express = require('express')

// controllers
const { getSeasons, getSeason } = require('../controllers/season/seasonsController')
const { getSeasonsFilteredByResults } = require('../controllers/season/filterSeasonsController')

// middlewares
const queryValidation = require('../middlewares/queryValidation')
const responsePagination = require('../middlewares/responsePagination')
const filterParser = require('../middlewares/filterParser')

// constants
const { BASE_ROUTE_FILTERS, RESULT_ROUTE_FILTERS } = require('../config/constants')

const router = express.Router()

// List of all seasons
router.get('/', [queryValidation, responsePagination], getSeasons)

// List of all seasons which match the specified filter
router.get(
  `${BASE_ROUTE_FILTERS}${RESULT_ROUTE_FILTERS}`,
  [responsePagination, filterParser],
  getSeasonsFilteredByResults
)

// Get season information
router.get('/:year', getSeason)

module.exports = router
