// services
const filterWithRegroupService = require('../../services/filter/filterWithRegroupService')

// models
const Result = require('../../models/mongoose/Result')
const SeasonResponse = require('../../models/response/SeasonResponse')

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
      seasons: SeasonResponse.parseList(seasons)
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getSeasonsFilteredByResults
}
