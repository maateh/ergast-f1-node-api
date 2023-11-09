// services
const filterResults = require('../../services/filter/filterResults')

// models
const { simplifyResult } = require('../../models/Result')

const getResults = async (req, res, next) => {
  const { metadata, pagination, filter } = res.locals

  try {
    const { results, total } = await filterResults(filter.results, pagination, {
      'season.year': 1,
      'weekend.round': 1
    })

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

module.exports = { getResults }
