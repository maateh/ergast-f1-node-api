const express = require('express')

// controllers
const getCircuitsController = require('../controllers/circuit/getCircuitsController')
const getFilterCircuitsController = require('../controllers/circuit/getFilterCircuitsController')
const getCircuitController = require('../controllers/circuit/getCircuitController')

// middlewares
const queryValidation = require('../middlewares/queryValidation')
const responsePagination = require('../middlewares/responsePagination')

const router = express.Router()

// List of all circuits
router.get('/', [queryValidation, responsePagination], getCircuitsController)

// List of all circuits who match the specified filter
router.get([
  '(/drivers/:driverId)?(/teams/:teamId)?(/year/:year)?',
  '(/drivers/:driverId)?(/teams/:teamId)?(/year/:year/round/:round)?'
], responsePagination, getFilterCircuitsController)

// Get circuit information
router.get('/:id', getCircuitController)

module.exports = router
