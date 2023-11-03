// models
const RaceResult = require('../../models/raceResult')
const QualifyingResult = require('../../models/qualifyingResult')
const SprintResult = require('../../models/sprintResult')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

// utils
const objectCleaner = require('../../utils/objectCleaner')
const filterCommonElements = require('../../utils/filterCommonElements')
const removeDuplicates = require('../../utils/removeDuplicates')
const { paginationWithSorting } = require('../../utils/pagination')

const getFilterDriversController = async (req, res, next) => {
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
    'team.ref': teamId
  })

  const raceFilter = objectCleaner({
    'position.order': racePosition,
    grid: raceGrid,
    fastest: raceFastest
  })

  const qualifyingFilter = objectCleaner({
    position: qualifyingPosition
  })

  const sprintFilter = objectCleaner({
    'position.order': sprintPosition,
    grid: sprintGrid
  })

  try {
    const qualifyingResults = qualifyingFilter
      ? await QualifyingResult.find({ ...filter, ...qualifyingFilter })
        .populate('driver._driver')
        .select('driver._driver')
      : []

    const sprintResults = sprintFilter
      ? await SprintResult.find({ ...filter, ...sprintFilter })
        .populate('driver._driver')
        .select('driver._driver')
      : []

    const raceResults = raceFilter || (!qualifyingFilter && !sprintFilter)
      ? await RaceResult.find({ ...filter, ...raceFilter })
        .populate('driver._driver')
        .select('driver._driver')
      : []

    const results = filterCommonElements('driver._driver.ref', [
      raceResults, qualifyingResults, sprintResults
    ])

    if (!results || !results.length) {
      throw new DataNotFoundError('Drivers')
    }

    const drivers = removeDuplicates(results, 'driver._driver.ref', 'driver._driver')
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
