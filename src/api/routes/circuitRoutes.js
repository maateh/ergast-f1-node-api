const express = require('express')

// controllers
const { getCircuits, getCircuit } = require('../controllers/circuit/circuitsController')
const { getCircuitsFilteredByResults } = require('../controllers/circuit/filterCircuitsController')

// middlewares
const queryValidation = require('../middlewares/queryValidation')
const responsePagination = require('../middlewares/responsePagination')
const filterParser = require('../middlewares/filterParser')

// constants
const { ROUTE_FILTERS: { drivers, teams, results } } = require('../config/constants')

const router = express.Router()

// List of all circuits
router.get('/', [queryValidation, responsePagination], getCircuits)

// List of all circuits which match the specified filter
router.get(
  `${drivers}${teams}${results.race}${results.qualifying}${results.sprint}`,
  [responsePagination, filterParser],
  getCircuitsFilteredByResults
)

// Get circuit information
router.get('/:id', getCircuit)

module.exports = router
