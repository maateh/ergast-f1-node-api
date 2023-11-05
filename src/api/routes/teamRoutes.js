const express = require('express')

// controllers
const getTeamsController = require('../controllers/team/getTeamsController')
const getRaceFilterTeamsController = require('../controllers/team/getRaceFilterTeamsController')
const getTeamController = require('../controllers/team/getTeamController')

// middlewares
const queryValidation = require('../middlewares/queryValidation')
const responsePagination = require('../middlewares/responsePagination')
const filterParser = require('../middlewares/filterParser')

const router = express.Router()

const baseFilterRoute = '(/circuits/:circuitId)?(/drivers/:driverId)?'

// List of all teams
router.get('/', [queryValidation, responsePagination], getTeamsController)

// List of all teams who match the specified filter (search in: raceresults)
router.get(
  `${baseFilterRoute}(/race(/:position)?(/grid/:grid)?(/fastest/:fastest)?(/points/:points)?)?`,
  [responsePagination, filterParser],
  getRaceFilterTeamsController
)

// TODO: create the remaining 2 route with their filter service
// - .../qualifying/:position
// - .../sprint/:position/grid/:grid/points/:points
// https://github.com/maateh/ergast-f1-node-api/issues/3

// Get team information
router.get('/:id', getTeamController)

module.exports = router
