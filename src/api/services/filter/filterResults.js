// models
const Result = require('../../models/Result')

const filterResults = async (
  filter = {},
  sort = {},
  pagination = { limit: 30, offset: 0 }
) => {
  const total = await Result.aggregate([
    { $match: filter },
    { $count: 'total' }
  ])

  const results = await Result.aggregate([
    { $match: filter },
    { $sort: sort },
    { $limit: pagination.limit },
    { $skip: pagination.offset },
    // TODO: populate -> season, weekend, driver, team, [+circuit?]
    // {
    //   $lookup: {
    //
    //   }
    // },
    { $project: { _id: 0, ergastId: 0, __v: 0 } }
  ])

  return {
    results,
    total: total.length ? total[0].total : 0
  }
}

module.exports = filterResults
