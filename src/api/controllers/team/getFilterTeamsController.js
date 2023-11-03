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

const getFilterTeamsController = async (req, res, next) => {
  const { year, round, circuitId, driverId } = req.params
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
    'driver.ref': driverId
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
        .populate('team._team')
        .select('team._team')
      : []

    const sprintResults = sprintFilter
      ? await SprintResult.find({ ...filter, ...sprintFilter })
        .populate('team._team')
        .select('team._team')
      : []

    const raceResults = raceFilter || (!qualifyingFilter && !sprintFilter)
      ? await RaceResult.find({ ...filter, ...raceFilter })
        .populate('team._team')
        .select('team._team')
      : []

    const results = filterCommonElements('team._team.ref', [
      raceResults, qualifyingResults, sprintResults
    ])

    if (!results || !results.length) {
      throw new DataNotFoundError('Teams')
    }

    const teams = removeDuplicates(results, 'team._team.ref', 'team._team')
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
