const express = require('express')

// controllers
const getTeamsController = require('../controllers/team/getTeamsController')
const getFilterTeamsController = require('../controllers/team/getFilterTeamsController')
const getTeamController = require('../controllers/team/getTeamController')

// middlewares
const responsePagination = require('../middlewares/responsePagination')

const router = express.Router()

// List of all teams
router.get('/', responsePagination, getTeamsController)

// List of all teams who match the specified filter
router.get([
  '(/circuits/:circuitId)?(/drivers/:driverId)?(/year/:year)?',
  '(/circuits/:circuitId)?(/drivers/:driverId)?(/year/:year/round/:round)?'
], responsePagination, getFilterTeamsController)

// Get team information
router.get('/:id', getTeamController)

module.exports = router
