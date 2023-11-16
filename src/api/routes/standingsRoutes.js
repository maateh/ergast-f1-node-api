const express = require('express')

// controllers
const { getDriverStandings } = require('../controllers/standings/driverStandingsController')
const { getTeamStandings } = require('../controllers/standings/teamStandingsController')

// middlewares
const responsePagination = require('../middlewares/responsePagination')
const filterParser = require('../middlewares/filterParser')

// constants
const { ROUTE_FILTERS: { drivers, teams, standings } } = require('../config/constants')

const router = express.Router()

// Get driver standings which match the specified filter
router.get(
  `/driver${drivers}${teams}${standings}`, // TODO: handle "/teams/:teamId" filter
  [responsePagination, filterParser],
  getDriverStandings
)

// Get team standings which match the specified filter
router.get(
  `/team${teams}${drivers}${standings}`, // TODO: handle "/drivers/:driverId" filter
  [responsePagination, filterParser],
  getTeamStandings
)

module.exports = router
