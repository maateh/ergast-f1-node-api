// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

// services
const resultsFilter = require('../../services/resultsFilter')

// utils
const objectCleaner = require('../../utils/objectCleaner')
const { paginationWithSorting } = require('../../utils/pagination')

const getFilterCircuitsController = async (req, res, next) => {
  const { year, round, driverId, teamId } = req.params
  const { limit, offset } = res.locals.pagination

  const filter = objectCleaner({
    'season.year': year,
    'weekend.round': round,
    'driver.ref': driverId,
    'team.ref': teamId
  })

  try {
    const circuits = await resultsFilter(req.query, filter,
      'circuit._circuit',
      'circuit._circuit',
      'circuit._circuit.ref'
    )

    if (!circuits || !circuits.length) {
      throw new DataNotFoundError('Circuits')
    }

    const simplifiedCircuits = circuits.map(c => c.simplify())

    res.json({
      metadata: res.locals.metadata,
      pagination: {
        ...res.locals.pagination,
        total: circuits.length
      },
      circuits: paginationWithSorting(simplifiedCircuits, limit, offset, 'name')
    })
  } catch (err) {
    next(err)
  }
}

module.exports = getFilterCircuitsController
