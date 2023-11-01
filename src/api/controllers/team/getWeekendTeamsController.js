// models
const Weekend = require('../../models/weekend')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

// utils
const { paginationWithSorting } = require('../../utils/pagination')

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

    res.json({
      metadata: res.locals.metadata,
      pagination: {
        ...res.locals.pagination,
        total: weekend.teams.length
      },
      teams: paginationWithSorting(simplifiedTeams, limit, offset, 'name')
    })
  } catch (err) {
    next(err)
  }
}

module.exports = getWeekendTeamsController
