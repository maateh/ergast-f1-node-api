const express = require('express')

// controllers
const { getRaceResults, getQualifyingResults, getSprintResults } = require('../controllers/results/resultsController')

// middlewares
const responsePagination = require('../middlewares/responsePagination')
const filterParser = require('../middlewares/filterParser')

const BASE_FILTER_ROUTE = '(/circuits/:circuitId)?(/drivers/:driverId)?(/teams/:teamId)?'

const router = express.Router()

// List of all race results which match the specified filter
router.get(
  `/race${BASE_FILTER_ROUTE}(/position(/:racePosition)?(/grid/:raceGrid)?(/fastest/:raceFastest)?(/points/:racePoints)?)?`,
  [responsePagination, filterParser],
  getRaceResults
)

// TODO: reconsider this current "filter results" route structure
// mechanism because models have already changed

// // List of all qualifying results which match the specified filter
// router.get(
//   `/qualifying${BASE_FILTER_ROUTE}(/position(/:qualifyingPosition)?)?`,
//   [responsePagination, filterParser],
//   getQualifyingResults
// )

// // List of all sprint results which match the specified filter
// router.get(
//   `/sprint${BASE_FILTER_ROUTE}(/position(/:sprintPosition)?(/grid/:sprintGrid)?(/points/:sprintPoints)?)?`,
//   [responsePagination, filterParser],
//   getSprintResults
// )

module.exports = router
