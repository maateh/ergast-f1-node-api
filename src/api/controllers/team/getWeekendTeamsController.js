// models
const Weekend = require('../../models/weekend')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

// utils
const sorting = require('../../utils/sorting')

const getWeekendTeamsController = async (req, res, next) => {
  const { year, round } = req.params
  const { limit, offset } = res.locals.pagination

  try {
    const weekend = await Weekend.findOne({ 'season.year': year, round })
      .populate('teams._team')
      .select('teams._team')

    if (!weekend || !weekend.teams || !weekend.teams.length) {
      throw new DataNotFoundError('Teams')
    }

    const simplifiedTeams = weekend.teams.map(t => t._team.simplify())
    const sortedTeams = await sorting(simplifiedTeams, 'name')
      .then(sortedTeams => {
        return sortedTeams.slice(offset, offset + limit)
      })

    res.json({
      metadata: res.locals.metadata,
      pagination: {
        ...res.locals.pagination,
        total: weekend.teams.length
      },
      teams: sortedTeams
    })
  } catch (err) {
    next(err)
  }
}

module.exports = getWeekendTeamsController
