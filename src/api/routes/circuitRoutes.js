const express = require('express')

// controllers
const getCircuitsController = require('../controllers/circuit/getCircuitsController')
const getSeasonCircuitsController = require('../controllers/circuit/getSeasonCircuitsController')
const getWeekendCircuitController = require('../controllers/circuit/getWeekendCircuitController')
const getCircuitController = require('../controllers/circuit/getCircuitController')

// middlewares
const responsePagination = require('../middlewares/responsePagination')

const router = express.Router()

// List of all circuits
router.get('/', responsePagination, getCircuitsController)

// List of all circuits within a season
router.get('/year/:year', responsePagination, getSeasonCircuitsController)

// Get circuit which was used on a weekend
router.get('/year/:year/round/:round', getWeekendCircuitController)

// Get circuit information
router.get('/:id', getCircuitController)

module.exports = router
