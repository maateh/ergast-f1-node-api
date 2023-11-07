// services
const filterWithPopulateResults = require('../../services/filterWithPopulateResults')

// models
const { simplifyWeekend } = require('../../models/Weekend')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getPopulatedWeekendsFilteredByResults = async (req, res, next, resultType) => {
  const { metadata, filter, pagination } = res.locals

  try {
    const { data: weekends, total } = await filterWithPopulateResults(resultType, filter, pagination, {
      targetCollection: 'weekends',
      populatingField: 'weekend._weekend',
      sort: { 'season.year': 1, round: 1 }
    })

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
  getPopulatedWeekendsFilteredByResults
}
