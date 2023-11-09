// models
const Result = require('../../models/Result')

const filterResults = async (
  filter = {},
  pagination = { limit: 30, offset: 0 },
  sort = {}
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
    {
      $lookup: {
        from: 'weekends',
        foreignField: '_id',
        localField: 'weekend._weekend',
        as: 'weekend'
      }
    },
    { $unwind: '$weekend' },
    {
      $lookup: {
        from: 'seasons',
        foreignField: '_id',
        localField: 'weekend.season._season',
        as: 'weekend.season'
      }
    },
    { $unwind: '$weekend.season' },
    {
      $lookup: {
        from: 'circuits',
        foreignField: '_id',
        localField: 'weekend.circuit._circuit',
        as: 'weekend.circuit'
      }
    },
    { $unwind: '$weekend.circuit' },
    {
      $lookup: {
        from: 'drivers',
        foreignField: '_id',
        localField: 'driver._driver',
        as: 'driver'
      }
    },
    { $unwind: '$driver' },
    {
      $lookup: {
        from: 'teams',
        foreignField: '_id',
        localField: 'team._team',
        as: 'team'
      }
    },
    { $unwind: '$team' },
    {
      $project: {
        _id: 0,
        ergastId: 0,
        __v: 0,
        season: 0,
        circuit: 0
      }
    }
  ])

  return {
    results,
    total: total.length ? total[0].total : 0
  }
}

module.exports = filterResults
