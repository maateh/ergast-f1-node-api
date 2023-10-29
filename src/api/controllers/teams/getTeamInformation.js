// models
const Team = require('../../models/team')

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

module.exports = getTeamInformation
