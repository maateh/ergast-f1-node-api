const express = require('express')

// controllers
const { getTimings } = require('../controllers/timing/timingsController')

// middlewares
const responsePagination = require('../middlewares/responsePagination')
const filterParser = require('../middlewares/filterParser')

// constants
const { BASE_ROUTE_FILTERS, LAPS_ROUTE_FILTERS } = require('../config/constants')

const router = express.Router()

// TODO: blocking requests with a middleware that don't
// contain mandatory query fields (year, round)

// Get lap timings from a weekend which match the specified filter
router.get(
  `${BASE_ROUTE_FILTERS}${LAPS_ROUTE_FILTERS}`,
  [responsePagination, filterParser],
  getTimings
)

module.exports = router
