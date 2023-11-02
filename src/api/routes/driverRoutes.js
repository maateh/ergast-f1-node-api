const express = require('express')

// controllers
const getDriversController = require('../controllers/driver/getDriversController')
// const getSeasonDriversController = require('../controllers/driver/getSeasonDriversController') // TODO: delete
const getWeekendDriversController = require('../controllers/driver/getWeekendDriversController') // TODO: rename
const getDriverController = require('../controllers/driver/getDriverController')

// middlewares
const queryValidation = require('../middlewares/queryValidation')
const responsePagination = require('../middlewares/responsePagination')

const router = express.Router()

// List of all drivers
router.get('/', [queryValidation, responsePagination], getDriversController)

// TODO: delete this
// List of all drivers within a season (who match the optionally specified filter)
// router.get(
//   '(/circuits/:circuitId)?(/teams/:teamId)?(/year/:year)?',
//   [queryValidation, responsePagination],
//   getSeasonDriversController
// )

// List of all drivers who match the specified filter
router.get([
  '(/circuits/:circuitId)?(/teams/:teamId)?(/year/:year)?',
  '(/circuits/:circuitId)?(/teams/:teamId)?(/year/:year/round/:round)?'
], responsePagination, getWeekendDriversController) // TODO: rename controller

// http://localhost:6969/api/ergast/f1/drivers/circuits/circuiz/teams/team/season/2020?racePosition=1&raceGrid=2&racefastest=3&qualifyingPosition=4&sprintPosition=5&sprintGrid=6
// query:
// - racePosition
// - raceGrid
// - racefastest
// - qualifyingPosition
// - sprintPosition
// - sprintGrid

// Get driver information
router.get('/:id', getDriverController)

module.exports = router
