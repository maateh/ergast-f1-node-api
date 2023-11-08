const express = require('express')

// controllers
const { getTeams, getTeam } = require('../controllers/team/teamsController')
const { getTeamsFilteredByResults } = require('../controllers/team/filterTeamsController')

// middlewares
const queryValidation = require('../middlewares/queryValidation')
const responsePagination = require('../middlewares/responsePagination')
const filterParser = require('../middlewares/filterParser')

const BASE_FILTER_ROUTE = '(/circuits/:circuitId)?(/drivers/:driverId)?'

const router = express.Router()

// List of all teams
router.get('/', [queryValidation, responsePagination], getTeams)

// List of all teams who match the specified filter
router.get(
  `${BASE_FILTER_ROUTE}(/race(/:racePosition)?(/grid/:raceGrid)?(/fastest/:raceFastest)?(/points/:racePoints)?)?`,
  [responsePagination, filterParser],
  getTeamsFilteredByResults
)

router.get(
  `${BASE_FILTER_ROUTE}(/qualifying(/:qualifyingPosition)?)?`,
  [responsePagination, filterParser],
  getTeamsFilteredByResults
)

router.get(
  `${BASE_FILTER_ROUTE}(/sprint(/:sprintPosition)?(/grid/:sprintGrid)?(/points/:sprintPoints)?)?`,
  [responsePagination, filterParser],
  getTeamsFilteredByResults
)

// Get team information
router.get('/:id', getTeam)

module.exports = router
