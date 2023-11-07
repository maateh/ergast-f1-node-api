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
  `/race${BASE_FILTER_ROUTE}(/position(/:position)?(/grid/:grid)?(/fastest/:fastest)?(/points/:points)?)?`,
  [responsePagination, filterParser],
  getRaceResults
)

// List of all qualifying results which match the specified filter
router.get(
  `/qualifying${BASE_FILTER_ROUTE}(/position(/:position)?)?`,
  [responsePagination, filterParser],
  getQualifyingResults
)

// List of all sprint results which match the specified filter
router.get(
  `/sprint${BASE_FILTER_ROUTE}(/position(/:position)?(/grid/:grid)?(/points/:points)?)?`,
  [responsePagination, filterParser],
  getSprintResults
)

module.exports = router
