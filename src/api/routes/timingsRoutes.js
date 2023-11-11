const express = require('express')

// controllers
const { getTimings } = require('../controllers/timings/timingsController')

// middlewares
const validateMandatoryQuery = require('../middlewares/validateMandatoryQuery')
const responsePagination = require('../middlewares/responsePagination')
const filterParser = require('../middlewares/filterParser')

// constants
const { ROUTE_FILTERS: { drivers, teams, timings } } = require('../config/constants')

const router = express.Router()

// Get lap timings from a weekend which match the specified filter
router.get(
  `${drivers}${teams}${timings}`,
  [validateMandatoryQuery, responsePagination, filterParser],
  getTimings
)

module.exports = router
