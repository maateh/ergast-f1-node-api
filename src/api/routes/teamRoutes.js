const express = require('express')

// controllers
const { getTeams, getTeam } = require('../controllers/team/teamsController')
const { getTeamsFilteredByResults } = require('../controllers/team/filterTeamsController')

// middlewares
const queryValidation = require('../middlewares/queryValidation')
const responsePagination = require('../middlewares/responsePagination')
const filterParser = require('../middlewares/filterParser')

// constants
const { ROUTE_FILTERS: { circuits, drivers, results } } = require('../config/constants')

const router = express.Router()

// List of all teams
router.get('/', [queryValidation, responsePagination], getTeams)

// List of all teams who match the specified filter
router.get(
  `${circuits}${drivers}${results.race}${results.qualifying}${results.sprint}`,
  [responsePagination, filterParser],
  getTeamsFilteredByResults
)

// Get team information
router.get('/:id', getTeam)

module.exports = router
