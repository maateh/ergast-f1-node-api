// models
const Team = require('../../models/team')

const getTeamInformation = async (req, res, next) => {
  const { id } = req.params

  try {
    const team = await Team.findOne({ ref: id })

    // TODO: don't return the whole team document
    res.json({
      metadata: res.locals.metadata,
      team
    })
  } catch (err) {
    // TODO: error handling
    res.status(500).json({ error: err.message })
    console.log('getTeamInformation: ', err)
  }
}

module.exports = getTeamInformation
