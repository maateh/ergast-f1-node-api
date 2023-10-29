const express = require('express')

// controllers
const getTeamsController = require('../controllers/team/getTeamsController')
const getSeasonTeamsController = require('../controllers/team/getSeasonTeamsController')
const getWeekendTeamsController = require('../controllers/team/getWeekendTeamsController')
const getTeamController = require('../controllers/team/getTeamController')

// middlewares
const responsePagination = require('../middlewares/responsePagination')

const router = express.Router()

// List of all teams
router.get('/', responsePagination, getTeamsController)

// List of all teams within a season
router.get('/year/:year', responsePagination, getSeasonTeamsController)

// List of all teams within a weekend in a season
router.get('/year/:year/round/:round', responsePagination, getWeekendTeamsController)

// Get team information
router.get('/:id', getTeamController)

module.exports = router
