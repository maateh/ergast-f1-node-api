const express = require('express')

// controllers
const { getLaps } = require('../controllers/lap/lapsController')

// middlewares
const responsePagination = require('../middlewares/responsePagination')
const filterParser = require('../middlewares/filterParser')

// constants
const { BASE_ROUTE_FILTERS, LAPS_ROUTE_FILTERS } = require('../config/constants')

const router = express.Router()

// TODO: blocking requests with a middleware that don't
// contain mandatory query fields (year, round)

// Get lap times from a weekend which match the specified filter
router.get(
  `${BASE_ROUTE_FILTERS}${LAPS_ROUTE_FILTERS}`,
  [responsePagination, filterParser],
  getLaps
)

module.exports = router
