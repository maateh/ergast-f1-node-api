// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

// services
const resultsFilter = require('../../services/resultsFilter')

// utils
const objectCleaner = require('../../utils/objectCleaner')
const { pagination } = require('../../utils/pagination')

const getFilterTeamsController = async (req, res, next) => {
  const { year, round, circuitId, driverId } = req.params

  const filter = objectCleaner({
    'season.year': year,
    'weekend.round': round,
    'circuit.ref': circuitId,
    'driver.ref': driverId
  })

  try {
    const teams = await resultsFilter(res.locals.queryFilter, filter, res.locals.pagination,
      'teams',
      'team',
      '_team',
      'name'
    )

    if (!teams || !teams.length) {
      throw new DataNotFoundError('Teams')
    }

    res.json({
      metadata: res.locals.metadata,
      pagination: {
        ...res.locals.pagination,
        total: teams.length
      },
      teams: pagination(teams, res.locals.pagination)
    })
  } catch (err) {
    next(err)
  }
}

module.exports = getFilterTeamsController
