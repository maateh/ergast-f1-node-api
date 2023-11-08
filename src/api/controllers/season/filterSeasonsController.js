// services
const filterWithRegroupResults = require('../../services/filter/filterWithRegroupResults')

// models
const { simplifySeason } = require('../../models/Season')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getSeasonsFilteredByResults = async (req, res, next) => {
  const { metadata, filter, pagination } = res.locals

  try {
    const { data: seasons, total } = await filterWithRegroupResults(filter.results, pagination, {
      targetCollection: 'seasons',
      groupingField: 'season._season',
      sort: { year: 1 },
      paginationBeforeLookup: true
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
