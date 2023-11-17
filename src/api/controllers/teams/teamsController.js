// models
const Team = require('../../models/mongoose/Team')
const TeamResponse = require('../../models/response/TeamResponse')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getTeams = async (req, res, next) => {
  const { metadata, pagination } = res.locals

  try {
    const total = await Team.countDocuments()
    const teams = await Team.find()
      .collation({ locale: 'en' })
      .sort('name')
      .skip(pagination.offset)
      .limit(pagination.limit)

    if (!teams || !teams.length) {
      throw new DataNotFoundError('Teams')
    }

    res.json({
      metadata,
      pagination: {
        ...pagination,
        total
      },
      teams: TeamResponse.parseList(teams)
    })
  } catch (err) {
    next(err)
  }
}

const getTeam = async (req, res, next) => {
  const { metadata } = res.locals
  const { id } = req.params

  try {
    const team = await Team.findOne({ ref: id })

    if (!team) {
      throw new DataNotFoundError('Team')
    }

    res.json({
      metadata,
      team: new TeamResponse(team)
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getTeams,
  getTeam
}
