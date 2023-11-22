const express = require('express')

// controllers
const { getDriverStandings } = require('../controllers/standings/driverStandingsController')
const { getTeamStandings } = require('../controllers/standings/teamStandingsController')

// middlewares
const responsePagination = require('../middlewares/responsePagination')
const filterParser = require('../middlewares/filterParser')

// constants
const { ROUTE_FILTERS: { standings } } = require('../config/constants')

const router = express.Router()

// Get driver standings which match the specified filter
router.get(
  `/driver(/:driverId)?${standings}`,
  [responsePagination, filterParser],
  getDriverStandings
)

// Get team standings which match the specified filter
router.get(
  `/team(/:teamId)?${standings}`,
  [responsePagination, filterParser],
  getTeamStandings
)

module.exports = router
