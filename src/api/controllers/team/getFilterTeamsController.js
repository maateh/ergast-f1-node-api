// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

// services
const resultsFilter = require('../../services/resultsFilter')

// utils
const objectCleaner = require('../../utils/objectCleaner')
const { paginationWithSorting } = require('../../utils/pagination')

const getFilterTeamsController = async (req, res, next) => {
  const { year, round, circuitId, driverId } = req.params
  const { limit, offset } = res.locals.pagination

  const filter = objectCleaner({
    'season.year': year,
    'weekend.round': round,
    'circuit.ref': circuitId,
    'driver.ref': driverId
  })

  try {
    const teams = await resultsFilter(req.query, filter,
      'team._team',
      'team._team',
      'team._team.ref'
    )

    if (!teams || !teams.length) {
      throw new DataNotFoundError('Teams')
    }

    const simplifiedTeams = teams.map(t => t.simplify())

    res.json({
      metadata: res.locals.metadata,
      pagination: {
        ...res.locals.pagination,
        total: teams.length
      },
      teams: paginationWithSorting(simplifiedTeams, limit, offset, 'name')
    })
  } catch (err) {
    next(err)
  }
}

module.exports = getFilterTeamsController
