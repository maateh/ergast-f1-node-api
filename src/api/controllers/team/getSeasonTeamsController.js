// models
const Season = require('../../models/season')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

// utils
const { paginationWithSorting } = require('../../utils/pagination')

const getSeasonTeamsController = async (req, res, next) => {
  const { year } = req.params
  const { limit, offset } = res.locals.pagination

  try {
    const season = await Season.findOne({ year })
      .populate('teams._team')
      .select('teams._team')

    if (!season || !season.teams || !season.teams.length) {
      throw new DataNotFoundError('Teams')
    }

    const simplifiedTeams = season.teams.map(t => t._team.simplify())

    res.json({
      metadata: res.locals.metadata,
      pagination: {
        ...res.locals.pagination,
        total: season.teams.length
      },
      teams: paginationWithSorting(simplifiedTeams, limit, offset, 'name')
    })
  } catch (err) {
    next(err)
  }
}

module.exports = getSeasonTeamsController
