// models
const RaceResult = require('../../models/raceResult')
const QualifyingResult = require('../../models/qualifyingResult')
const SprintResult = require('../../models/sprintResult')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

// utils
const objectCleaner = require('../../utils/objectCleaner')
const removeDuplicates = require('../../utils/removeDuplicates')
const { paginationWithSorting } = require('../../utils/pagination')

const getWeekendDriversController = async (req, res, next) => {
  const { year, round, circuitId, teamId } = req.params
  const {
    racePosition,
    raceGrid,
    raceFastest,
    qualifyingPosition,
    sprintPosition,
    sprintGrid
  } = req.query
  const { limit, offset } = res.locals.pagination

  const filter = objectCleaner({
    'season.year': year,
    'weekend.round': round,
    'circuit.ref': circuitId,
    'team.ref': teamId,
    'position.order': racePosition,
    grid: raceGrid,
    fastest: raceFastest
  })

  try {
    const results = await RaceResult.find(filter)
      .populate('driver._driver')
      .select('driver._driver')

    if (!results || !results.length) {
      throw new DataNotFoundError('Drivers')
    }

    const drivers = removeDuplicates(results, 'driver._driver._id', 'driver._driver')
    const simplifiedDrivers = drivers.map(d => d.simplify())

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
