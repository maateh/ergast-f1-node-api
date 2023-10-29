// models
const Team = require('../../models/team')

const getAllTeams = (req, res, next) => {
  const { limit, offset } = req.query

  Team.find()
    .sort({ name: 1 })
    .skip(offset)
    .limit(limit)
    .then(teams => {
      res.status(200).json(teams)
    })
    .catch(err => {
      // TODO: error handling
      res.status(400).json({ success: false })
      console.log('getAllTeams: ', err)
    })
}

module.exports = getAllTeams
