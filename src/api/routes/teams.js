const express = require('express')

const controller = require('../controllers/teams')

const router = express.Router()

// List of all teams
router.get('/', controller.getAllTeams)

// List of all teams within a season
router.get('/year/:year', controller.getTeamsWithinASeason)

// List of all teams within a weekend in a season
router.get('/year/:year/round/:round', controller.getTeamsWithinAWeekend)

// Team information
router.get('/:id', controller.getTeamInformation)

module.exports = router
