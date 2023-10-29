const express = require('express')

// controllers
const controller = require('../controllers/circuits')

// middlewares
const responsePagination = require('../middlewares/responsePagination')

const router = express.Router()

// List of all circuits
router.get('/', responsePagination, controller.getAllCircuits)

// List of all circuits within a season
router.get('/year/:year', responsePagination, controller.getCircuitsWithinASeason)

// List of all circuits within a weekend in a season
router.get('/year/:year/round/:round', responsePagination, controller.getCircuitsWithinAWeekend)

// Circuit information
router.get('/:id', controller.getCircuitInformation)

module.exports = router
