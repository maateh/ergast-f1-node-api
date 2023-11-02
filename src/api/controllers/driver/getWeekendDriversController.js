// models
const RaceResult = require('../../models/raceResult')
const QualifyingResult = require('../../models/qualifyingResult')
const SprintResult = require('../../models/sprintResult')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

// utils
const objectCleaner = require('../../utils/objectCleaner')
const { paginationWithSorting } = require('../../utils/pagination')

const getWeekendDriversController = async (req, res, next) => {
  const { year, round, circuitId, teamId } = req.params
  const { limit, offset } = res.locals.pagination

  const filter = objectCleaner({
    'season.year': year,
    'weekend.round': round,
    'circuit.ref': circuitId,
    'team.ref': teamId
  })

  try {
    const results = await RaceResult.find(filter)
      .populate('driver._driver')
      .select('driver._driver')

    if (!results || !results.length) {
      throw new DataNotFoundError('Drivers')
    }

    const simplifiedDrivers = results.map(r => r.driver._driver.simplify())

    res.json({
      metadata: res.locals.metadata,
      pagination: {
        ...res.locals.pagination,
        total: results.length
      },
      drivers: paginationWithSorting(simplifiedDrivers, limit, offset, 'name.lastName')
    })
  } catch (err) {
    next(err)
  }
}

module.exports = getWeekendDriversController
