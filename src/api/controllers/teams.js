// models
const Team = require('../models/team')
const Season = require('../models/season')
const Weekend = require('../models/weekend')

const getAllTeams = (req, res, next) => {
  Team.find()
    .then(teams => {
      res.status(200).json(teams)
    })
    .catch(err => {
      // TODO: error handling
      res.status(400).json({ success: false })
      console.log('getAllTeams: ', err)
    })
}

const getTeamInformation = (req, res, next) => {
  const { id } = req.params

  Team.findOne({ ref: id })
    .then(team => {
      res.status(200).json(team)
    })
    .catch(err => {
      // TODO: error handling
      res.status(400).json({ success: false })
      console.log('getTeamInformation: ', err)
    })
}

const getTeamsWithinASeason = (req, res, next) => {
  const { year } = req.params

  Season.findOne({ year }).populate('teams._team')
    .then(season => {
      const teams = season.teams.map(t => t._team)

      res.status(200).json(teams)
    })
    .catch(err => {
      // TODO: error handling
      console.log('getTeamsWithinASeason: ', err)
    })
}

const getTeamsWithinAWeekend = (req, res, next) => {
  const { year, round } = req.params

  Weekend.findOne({ year, round }).populate('teams._team')
    .then(weekend => {
      const teams = weekend.teams.map(t => t._team)

      res.status(200).json(teams)
    })
    .catch(err => {
      // TODO: error handling
      console.log('getTeamsWithinAWeekend: ', err)
    })
}

module.exports = {
  getAllTeams,
  getTeamInformation,
  getTeamsWithinASeason,
  getTeamsWithinAWeekend
}
