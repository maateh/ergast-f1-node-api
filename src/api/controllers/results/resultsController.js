// services
const filterService = require('../../services/filter/filterService')

// models
const Result = require('../../models/mongoose/Result')
const { simplifyResult } = require('../../models/mongoose/Result')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

// utils
const objectCleaner = require('../../utils/objectCleaner')

const getResults = async (req, res, next) => {
  const { metadata, pagination, filter } = res.locals

  try {
    const { data: results, total } = await filterService(Result, filter.results, pagination, {
      'season.year': 1,
      'weekend.round': 1,
      ...sortingKeys(req.originalUrl)
    }, {
      weekend: 1,
      driver: 1,
      team: 1,
      ...requiredResults(req.originalUrl)
    }, { weekend: true, driver: true, team: true })

    if (!results || !results.length) {
      throw new DataNotFoundError('Results')
    }

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

/**
 * Generates additional sorting keys based on the provided URL.
 * It creates an object with keys for sorting race, qualifying, and sprint results.
 * The keys are set to 1 if the corresponding type is present in the URL, otherwise undefined.
 * @param {string} url - The URL to analyze.
 * @returns {Object} An object with sorting keys for race, qualifying, and sprint results.
 */
function sortingKeys(url) {
  return objectCleaner({
    'race.position.order': url.includes('race') ? 1 : undefined,
    'qualifying.position': url.includes('qualifying') ? 1 : undefined,
    'sprint.position.order': url.includes('sprint') ? 1 : undefined
  })
}

/**
 * Determines the required fields based on the provided URL.
 * If the URL contains a specific type (race, qualifying, or sprint),
 * it returns an object with that type as a required field.
 * Otherwise, it returns an object with all types as required fields.
 * @param {string} url - The URL to analyze.
 * @returns {Object} An object specifying the required fields.
 */
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
