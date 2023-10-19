const express = require('express')

const controller = require('../controllers/circuits')

const router = express.Router()

// List of all circuits
router.get('/', controller.getAllCircuits)

// Circuit information
router.get('/:id', controller.getCircuitInformation)

// List of all circuits within a year
router.get('/year/:year', controller.getCircuitsWithinAYear)

// List of all circuits within a race in a year
router.get('/year/:year/round/:round', controller.getCircuitsWithinARace)

module.exports = router
