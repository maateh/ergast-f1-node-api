// models
const RaceResult = require('../../models/RaceResult')
const QualifyingResult = require('../../models/QualifyingResult')
const SprintResult = require('../../models/SprintResult')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

// utils
const objectCleaner = require('../../utils/objectCleaner')
const filterCommonElements = require('../../utils/filterCommonElements')
const removeDuplicates = require('../../utils/removeDuplicates')
const { paginationWithSorting } = require('../../utils/pagination')

const getFilterCircuitsController = async (req, res, next) => {
  const { year, round, driverId, teamId } = req.params
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
    'driver.ref': driverId,
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
        .populate('circuit._circuit')
        .select('circuit._circuit')
      : []

    const sprintResults = sprintFilter
      ? await SprintResult.find({ ...filter, ...sprintFilter })
        .populate('circuit._circuit')
        .select('circuit._circuit')
      : []

    const raceResults = raceFilter || (!qualifyingFilter && !sprintFilter)
      ? await RaceResult.find({ ...filter, ...raceFilter })
        .populate('circuit._circuit')
        .select('circuit._circuit')
      : []

    const results = filterCommonElements('circuit._circuit.ref', [
      raceResults, qualifyingResults, sprintResults
    ])

    if (!results || !results.length) {
      throw new DataNotFoundError('Circuits')
    }

    const circuits = removeDuplicates(results, 'circuit._circuit.ref', 'circuit._circuit')
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
