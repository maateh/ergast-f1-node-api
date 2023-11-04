const express = require('express')

// controllers
const getTeamsController = require('../controllers/team/getTeamsController')
const getFilterTeamsController = require('../controllers/team/getFilterTeamsController')
const getTeamController = require('../controllers/team/getTeamController')

// middlewares
const queryValidation = require('../middlewares/queryValidation')
const responsePagination = require('../middlewares/responsePagination')
const queryFilterParser = require('../middlewares/queryFilterParser')

const router = express.Router()

// List of all teams
router.get('/', [queryValidation, responsePagination], getTeamsController)

// FIXME: I don't like this current solution. It's not so sophisticated.
// What if I change this "one-route filter" approach and take
// apart to 3 different routes: (?)
// - .../race/:position/grid/:grid/fastest/:fastest/points/:points
// - .../qualifying/:position
// - .../sprint/:position/grid/:grid/points/:points
// https://github.com/maateh/ergast-f1-node-api/issues/3

// List of all teams who match the specified filter
router.get([
  '(/circuits/:circuitId)?(/drivers/:driverId)?(/year/:year)?',
  '(/circuits/:circuitId)?(/drivers/:driverId)?(/year/:year/round/:round)?'
], [queryFilterParser, responsePagination], getFilterTeamsController)

// Get team information
router.get('/:id', getTeamController)

module.exports = router
