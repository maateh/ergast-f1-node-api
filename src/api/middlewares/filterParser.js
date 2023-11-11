// utils
const objectCleaner = require('../utils/objectCleaner')

const filterParser = (req, res, next) => {
  // Collects every values which are given as query and route params
  // and then gets rid of any values that are NULL or UNDEFINED
  const filterParams = objectCleaner({
    ...req.query,
    ...req.params
  })

  // Values under these keys must be Numbers
  const numericFilters = [
    'year',
    'round',
    'racePosition',
    'raceGrid',
    'raceFastest',
    'racePoints',
    'qualifyingPosition',
    'sprintPosition',
    'sprintGrid',
    'sprintPoints',
    'timingLapNumber',
    'timingPosition',
    'timingDuration',
    'pitStop',
    'pitStopLap',
    'pitStopDuration'
  ]

  // Converts any value to a Number that must be a Number
  // based on the "numericFilters" array keys.
  Object.keys(filterParams).forEach(key => {
    if (numericFilters.includes(key)) {
      filterParams[key] = parseInt(filterParams[key])
    }
  })

  // Destructure all possible properties from "filterParams" even
  // if they are UNDEFINED (in next step we get rid of these
  // unnecessary values)
  const {
    year,
    round,
    circuitId,
    driverId,
    teamId,
    racePosition,
    raceGrid,
    raceFastest,
    racePoints,
    qualifyingPosition,
    sprintPosition,
    sprintGrid,
    sprintPoints,
    timingLapNumber,
    timingPosition,
    timingDuration,
    pitStop,
    pitStopLap,
    pitStopDuration
  } = filterParams

  // Parses values from "filterParams" to be able to use them
  // as an aggregation query filter (at stage: $match)
  res.locals.filter = objectCleaner({
    results: {
      'season.year': year,
      'weekend.round': round,
      'circuit.ref': circuitId,
      'driver.ref': driverId,
      'team.ref': teamId,
      'race.position.order': racePosition,
      'race.grid': raceGrid,
      'race.fastest.rank': raceFastest,
      'race.points': racePoints ? { $gte: racePoints } : undefined,
      'qualifying.position': qualifyingPosition,
      'sprint.position.order': sprintPosition,
      'sprint.grid': sprintGrid,
      'sprint.points': sprintPoints ? { $gte: sprintPoints } : undefined,
      race: req.originalUrl.includes('race') ? { $exists: true } : undefined,
      qualifying: req.originalUrl.includes('qualifying') ? { $exists: true } : undefined,
      sprint: req.originalUrl.includes('sprint') ? { $exists: true } : undefined
    },
    timings: {
      'season.year': year,
      'weekend.round': round,
      'driver.ref': driverId,
      'team.ref': teamId,
      lap: timingLapNumber,
      position: timingPosition,
      'duration.ms': timingDuration ? { $lte: timingDuration } : undefined
    },
    pitStops: {
      'season.year': year,
      'weekend.round': round,
      'driver.ref': driverId,
      'team.ref': teamId,
      stop: pitStop,
      lap: pitStopLap,
      'duration.ms': pitStopDuration ? { $lte: pitStopDuration } : undefined
    }
  })

  next()
}

module.exports = filterParser
