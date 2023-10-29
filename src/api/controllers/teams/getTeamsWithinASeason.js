// models
const Season = require('../../models/season')

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

module.exports = getTeamsWithinASeason
