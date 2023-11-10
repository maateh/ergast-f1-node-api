// models
const LapTime = require('../../models/LapTime')

const filterLaps = async (
  filter = {},
  pagination = { limit: 30, offset: 0 },
  sort = {}
) => {
  const total = await LapTime.aggregate([
    { $match: filter },
    { $count: 'total' }
  ])

  const laps = await LapTime.aggregate([
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
        __v: 0,
        season: 0,
        circuit: 0 // TODO: remove as soon as possible
      }
    }
  ])

  return {
    laps,
    total: total.length ? total[0].total : 0
  }
}

module.exports = filterLaps
