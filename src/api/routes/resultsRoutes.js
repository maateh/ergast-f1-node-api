const express = require('express')

// controllers
const { getResults } = require('../controllers/results/resultsController')

// middlewares
const responsePagination = require('../middlewares/responsePagination')
const filterParser = require('../middlewares/filterParser')

// constants
const { ROUTE_FILTERS: { circuits, drivers, teams, results } } = require('../config/constants')

const router = express.Router()

// List of all results which match the specified filter
router.get(
  `${circuits}${drivers}${teams}${results.race}${results.qualifying}${results.sprint}`,
  [responsePagination, filterParser],
  getResults
)

module.exports = router
