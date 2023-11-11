const express = require('express')

// controllers
const { getPitStops } = require('../controllers/pitstops/pitStopsController')

// middlewares
const validateMandatoryQuery = require('../middlewares/validateMandatoryQuery')
const responsePagination = require('../middlewares/responsePagination')
const filterParser = require('../middlewares/filterParser')

// constants
const { ROUTE_FILTERS: { drivers, teams, pitStops } } = require('../config/constants')

const router = express.Router()

// Get pit stops from a weekend which match the specified filter
router.get(
  `${drivers}${teams}${pitStops}`,
  [validateMandatoryQuery, responsePagination, filterParser],
  getPitStops
)

module.exports = router
