// utils
const objectCleaner = require('../utils/objectCleaner')

const filterParser = (req, res, next) => {
  const filterParams = objectCleaner({
    ...req.params,
    ...req.query
  })

  const numericFilters = [
    'position',
    'grid',
    'fastest',
    'points',
    'year',
    'round'
  ]

  Object.keys(filterParams).forEach(key => {
    if (numericFilters.includes(key)) {
      filterParams[key] = parseInt(filterParams[key])
    }
  })

  res.locals.filterParams = filterParams
  next()
}

module.exports = filterParser
