const express = require('express')

// controllers
const getAllCircuits = require('../controllers/circuits/getAllCircuits')
const getCircuitsWithinASeason = require('../controllers/circuits/getCircuitsWithinASeason')
const getCircuitsWithinAWeekend = require('../controllers/circuits/getCircuitsWithinAWeekend')
const getCircuitInformation = require('../controllers/circuits/getCircuitInformation')

// middlewares
const responsePagination = require('../middlewares/responsePagination')

const router = express.Router()

// List of all circuits
router.get('/', responsePagination, getAllCircuits)

// List of all circuits within a season
router.get('/year/:year', responsePagination, getCircuitsWithinASeason)

// List of all circuits within a weekend in a season
router.get('/year/:year/round/:round', responsePagination, getCircuitsWithinAWeekend)

// Circuit information
router.get('/:id', getCircuitInformation)

module.exports = router
