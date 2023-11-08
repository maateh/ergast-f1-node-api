const express = require('express')

// controllers
const { getCircuits, getCircuit } = require('../controllers/circuit/circuitsController')
const { getCircuitsFilteredByResults } = require('../controllers/circuit/filterCircuitsController')

// middlewares
const queryValidation = require('../middlewares/queryValidation')
const responsePagination = require('../middlewares/responsePagination')
const filterParser = require('../middlewares/filterParser')

const BASE_FILTER_ROUTE = '(/drivers/:driverId)?(/teams/:teamId)?'

const router = express.Router()

// List of all circuits
router.get('/', [queryValidation, responsePagination], getCircuits)

// List of all circuits which match the specified filter
router.get(
  `${BASE_FILTER_ROUTE}(/race(/:racePosition)?(/grid/:raceGrid)?(/fastest/:raceFastest)?(/points/:racePoints)?)?`,
  [responsePagination, filterParser],
  getCircuitsFilteredByResults
)

router.get(
  `${BASE_FILTER_ROUTE}(/qualifying(/:qualifyingPosition)?)?`,
  [responsePagination, filterParser],
  getCircuitsFilteredByResults
)

router.get(
  `${BASE_FILTER_ROUTE}(/sprint(/:sprintPosition)?(/grid/:sprintGrid)?(/points/:sprintPoints)?)?`,
  [responsePagination, filterParser],
  getCircuitsFilteredByResults
)

// Get circuit information
router.get('/:id', getCircuit)

module.exports = router
