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
  `${BASE_FILTER_ROUTE}(/race(/:position)?(/grid/:grid)?(/fastest/:fastest)?(/points/:points)?)?`,
  [responsePagination, filterParser],
  (req, res, next) => {
    getCircuitsFilteredByResults(req, res, next, 'race')
  }
)

router.get(
  `${BASE_FILTER_ROUTE}(/qualifying(/:position)?)?`,
  [responsePagination, filterParser],
  (req, res, next) => {
    getCircuitsFilteredByResults(req, res, next, 'qualifying')
  }
)

router.get(
  `${BASE_FILTER_ROUTE}(/sprint(/:position)?(/grid/:grid)?(/points/:points)?)?`,
  [responsePagination, filterParser],
  (req, res, next) => {
    getCircuitsFilteredByResults(req, res, next, 'sprint')
  }
)

// Get circuit information
router.get('/:id', getCircuit)

module.exports = router
