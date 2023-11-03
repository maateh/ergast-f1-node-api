// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

// services
const resultsFilter = require('../../services/resultsFilter')

// utils
const objectCleaner = require('../../utils/objectCleaner')
const { paginationWithSorting } = require('../../utils/pagination')

const getFilterDriversController = async (req, res, next) => {
  const { year, round, circuitId, teamId } = req.params
  const { limit, offset } = res.locals.pagination

  const filter = objectCleaner({
    'season.year': year,
    'weekend.round': round,
    'circuit.ref': circuitId,
    'team.ref': teamId
  })

  try {
    const drivers = await resultsFilter(req.query, filter,
      'driver._driver',
      'driver._driver',
      'driver._driver.ref'
    )

    if (!drivers || !drivers.length) {
      throw new DataNotFoundError('Drivers')
    }

    const simplifiedDrivers = drivers.map(d => d.simplify())

    res.json({
      metadata: res.locals.metadata,
      pagination: {
        ...res.locals.pagination,
        total: drivers.length
      },
      drivers: paginationWithSorting(simplifiedDrivers, limit, offset, 'name.lastName')
    })
  } catch (err) {
    next(err)
  }
}

module.exports = getFilterDriversController
