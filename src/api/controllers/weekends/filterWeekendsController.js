// services
const filterWithRegroupResults = require('../../services/filter/filterWithRegroupResults')

// models
const { simplifyWeekend } = require('../../models/Weekend')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getWeekendsFilteredByResults = async (req, res, next) => {
  const { metadata, filter, pagination } = res.locals

  try {
    const { data: weekends, total } = await filterWithRegroupResults(filter.results, pagination, {
      targetCollection: 'weekends',
      groupingField: 'weekend._weekend',
      sort: { 'season.year': 1, 'weekend.round': 1 },
      paginationBeforeLookup: true
    }, [
      {
        $lookup: {
          from: 'seasons',
          localField: 'season._season',
          foreignField: '_id',
          as: 'season._season'
        }
      },
      { $unwind: '$season._season' },
      {
        $lookup: {
          from: 'circuits',
          localField: 'circuit._circuit',
          foreignField: '_id',
          as: 'circuit._circuit'
        }
      },
      { $unwind: '$circuit._circuit' }
    ])

    if (!weekends || !weekends.length) {
      throw new DataNotFoundError('Weekends')
    }

    res.json({
      metadata,
      pagination: {
        ...pagination,
        total
      },
      weekends: weekends.map(w => simplifyWeekend(w))
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getWeekendsFilteredByResults
}
