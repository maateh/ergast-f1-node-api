// services
const filterWithRegroupService = require('../../services/filter/filterWithRegroupService')

// models
const Result = require('../../models/Result')
const { simplifySeason } = require('../../models/Season')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getSeasonsFilteredByResults = async (req, res, next) => {
  const { metadata, filter, pagination } = res.locals

  try {
    const { data: seasons, total } = await filterWithRegroupService(Result, filter.results, pagination, {
      groupingField: 'season._season',
      targetCollection: 'seasons',
      sort: { year: 1 },
      sortingBeforeGrouping: true,
      requiredFields: {
        year: 1,
        wiki: 1
      }
    })

    if (!seasons || !seasons.length) {
      throw new DataNotFoundError('Seasons')
    }

    res.json({
      metadata,
      pagination: {
        ...pagination,
        total
      },
      seasons: seasons.map(s => simplifySeason(s))
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getSeasonsFilteredByResults
}
