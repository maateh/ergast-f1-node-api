// services
const filterWithRegroupService = require('../../services/filter/filterWithRegroupService')

// models
const Result = require('../../models/mongoose/Result')
const { simplifyWeekend } = require('../../models/mongoose/Weekend')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getWeekendsFilteredByResults = async (req, res, next) => {
  const { metadata, filter, pagination } = res.locals

  try {
    const { data: weekends, total } = await filterWithRegroupService(Result, filter.results, pagination, {
      groupingField: 'weekend._weekend',
      targetCollection: 'weekends',
      sort: { 'season.year': 1, 'weekend.round': 1 },
      sortingBeforeGrouping: true,
      requiredFields: {
        season: 1,
        round: 1,
        name: 1,
        circuit: 1,
        sessions: 1,
        wiki: 1
      }
    }, { weekend: true })

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
