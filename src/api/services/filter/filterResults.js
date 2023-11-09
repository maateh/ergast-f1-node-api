// models
const Result = require('../../models/Result')

const filterResults = async (
  filter = {},
  pagination = { limit: 30, offset: 0 },
  sort = {},
  requiredResults = {
    race: 1,
    qualifying: 1,
    sprint: 1
  }
) => {
  const total = await Result.aggregate([
    { $match: filter },
    { $count: 'total' }
  ])

  const results = await Result.aggregate([
    { $match: filter },
    { $sort: sort },
    { $skip: pagination.offset },
    { $limit: pagination.limit },
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
        driver: 1,
        team: 1,
        weekend: 1,
        ...requiredResults,
      }
    }
  ])

  return {
    results,
    total: total.length ? total[0].total : 0
  }
}

module.exports = filterResults
