// services
const filterResults = require('../../services/filter/filterResults')

// models
const { simplifyResult } = require('../../models/Result')

// utils
const objectCleaner = require('../../utils/objectCleaner')

const getResults = async (req, res, next) => {
  const { metadata, pagination, filter } = res.locals

  const requiredFields = requiredResults(req.url)

  const resultsFilter = objectCleaner({
    ...filter.results,
    race: requiredFields.race ? { $exists: true } : undefined,
    qualifying: requiredFields.qualifying ? { $exists: true } : undefined,
    sprint: requiredFields.sprint ? { $exists: true } : undefined,
  })

  try {
    const { results, total } = await filterResults(resultsFilter, pagination, {
      'season.year': 1,
      'weekend.round': 1,
      ...sortingKeys(req.url)
    }, requiredFields)

    res.json({
      metadata,
      pagination: {
        ...pagination,
        total
      },
      results: results.map(r => simplifyResult(r))
    })
  } catch (err) {
    next(err)
  }
}

// TODO: write description
function sortingKeys(url) {
  return objectCleaner({
    'race.position.order': url.includes('race') ? 1 : undefined,
    'qualifying.position': url.includes('qualifying') ? 1 : undefined,
    'sprint.position.order': url.includes('sprint') ? 1 : undefined
  })
}

// TODO: write description
function requiredResults(url) {
  const fields = {
    race: 1,
    qualifying: 1,
    sprint: 1
  }

  const requiredFields = Object.keys(fields)
    .filter(key => url.includes(key))
    .reduce((obj, key) => {
      if (!obj) {
        obj = {}
      }

      obj[key] = 1
      return obj
    }, null)

  return requiredFields || fields
}

module.exports = {
  getResults
}
