const express = require('express')

const controller = require('../controllers/circuits')

const router = express.Router()

// List of all circuits
router.get('/', controller.getAllCircuits)

// List of all circuits within a season
router.get('/year/:year', controller.getCircuitsWithinASeason)

// List of all circuits within a weekend in a season
router.get('/year/:year/round/:round', controller.getCircuitsWithinAWeekend)

// Circuit information
router.get('/:id', controller.getCircuitInformation)

module.exports = router
