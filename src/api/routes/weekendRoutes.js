const express = require('express')

// controllers
const { getWeekends, getWeekend } = require('../controllers/weekend/weekendsController')
const { getWeekendsFilteredByResults } = require('../controllers/weekend/filterWeekendsController')

// middlewares
const queryValidation = require('../middlewares/queryValidation')
const responsePagination = require('../middlewares/responsePagination')
const filterParser = require('../middlewares/filterParser')

// constants
const { ROUTE_FILTERS: { circuits, drivers, teams, results } } = require('../config/constants')

const router = express.Router()

// List of all weekends
router.get('/', [queryValidation, responsePagination], getWeekends)

// List of all weekends which match the specified filter
router.get(
  `${circuits}${drivers}${teams}${results.race}${results.qualifying}${results.sprint}`,
  [responsePagination, filterParser],
  getWeekendsFilteredByResults
)

// Get weekend information
router.get('/:year/:round', getWeekend)

module.exports = router
