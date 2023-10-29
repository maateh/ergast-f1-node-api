const express = require('express')

// controllers
const controller = require('../controllers/teams')

// middlewares
const responsePagination = require('../middlewares/responsePagination')

const router = express.Router()

// List of all teams
router.get('/', responsePagination, controller.getAllTeams)

// List of all teams within a season
router.get('/year/:year', responsePagination, controller.getTeamsWithinASeason)

// List of all teams within a weekend in a season
router.get('/year/:year/round/:round', responsePagination, controller.getTeamsWithinAWeekend)

// Team information
router.get('/:id', controller.getTeamInformation)

module.exports = router
