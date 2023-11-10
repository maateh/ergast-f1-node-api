const express = require('express')

// controllers
const { getLaps, getLap } = require('../controllers/results/lapsController')
const { getDriverLaps, getDriverLap } = require('../controllers/results/driverLapsController')

// middlewares
const responsePagination = require('../middlewares/responsePagination')
const filterParser = require('../middlewares/filterParser')

const router = express.Router()

// Get drivers lap times from a weekend
router.get('/', [responsePagination, filterParser], getLaps)

// Get drivers lap times of a specific lap from a weekend
router.get('/:lap', filterParser, getLap)

// Get a specific or a list of all driver lap times from a weekend
router.get('/drivers/:driverId', [responsePagination, filterParser], getDriverLaps)

// Get a specific or a list of all driver lap times from a weekend
router.get('/:lap/drivers/:driverId', filterParser, getDriverLap)

module.exports = router
