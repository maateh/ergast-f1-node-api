const express = require('express')

// controllers
const getAllTeams = require('../controllers/teams/getAllTeams')
const getTeamsWithinASeason = require('../controllers/teams/getTeamsWithinASeason')
const getTeamsWithinAWeekend = require('../controllers/teams/getTeamsWithinAWeekend')
const getTeamInformation = require('../controllers/teams/getTeamInformation')

// middlewares
const responsePagination = require('../middlewares/responsePagination')

const router = express.Router()

// List of all teams
router.get('/', responsePagination, getAllTeams)

// List of all teams within a season
router.get('/year/:year', responsePagination, getTeamsWithinASeason)

// List of all teams within a weekend in a season
router.get('/year/:year/round/:round', responsePagination, getTeamsWithinAWeekend)

// Get team information
router.get('/:id', getTeamInformation)

module.exports = router
