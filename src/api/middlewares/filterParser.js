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
    'position',
    'grid',
    'fastest',
    'points'
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
    position,
    grid,
    fastest,
    points
  } = filterParams

  // Parses values from "filterParams" to be able to use them
  // as an aggregation query filter (at stage: $match)
  res.locals.filter = objectCleaner({
    'season.year': year,
    'weekend.round': round,
    'circuit.ref': circuitId,
    'driver.ref': driverId,
    'team.ref': teamId,
    'position.order': position,
    grid,
    fastest,
    points: points ? { $gte: points } : undefined
  })

  next()
}

module.exports = filterParser
