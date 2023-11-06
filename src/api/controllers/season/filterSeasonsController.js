// services
const filterWithPopulateResults = require('../../services/filterWithPopulateResults')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getPopulatedSeasonsFilteredByResults = async (req, res, next, resultType) => {
  const { metadata, filter, pagination } = res.locals

  try {
    const { data: seasons, total } = await filterWithPopulateResults(resultType, filter, pagination, {
      targetCollection: 'seasons',
      populatingField: 'season._season',
      sort: { year: 1 }
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
      seasons
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getPopulatedSeasonsFilteredByResults
}
