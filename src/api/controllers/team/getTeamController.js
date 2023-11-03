// models
const Team = require('../../models/Team')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getTeamController = async (req, res, next) => {
  const { id } = req.params

  try {
    const team = await Team.findOne({ ref: id })

    if (!team) {
      throw new DataNotFoundError('Team')
    }

    res.json({
      metadata: res.locals.metadata,
      team: team.simplify()
    })
  } catch (err) {
    next(err)
  }
}

module.exports = getTeamController
