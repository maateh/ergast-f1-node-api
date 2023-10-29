// models
const Weekend = require('../../models/weekend')

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

module.exports = getTeamsWithinAWeekend
