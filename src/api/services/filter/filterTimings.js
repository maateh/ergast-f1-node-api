// models
const Weekend = require('../../models/Weekend')
const Timing = require('../../models/Timing')

const filterTimings = async (
  filter = {},
  pagination = { limit: 30, offset: 0 },
  sort = {}
) => {
  const [weekend] = await Weekend.aggregate([
    {
      $match: {
        'season.year': filter['season.year'],
        round: filter['weekend.round'],
      }
    },
    {
      $lookup: {
        from: 'seasons',
        foreignField: '_id',
        localField: 'season._season',
        as: 'season'
      }
    },
    { $unwind: '$season' },
    {
      $lookup: {
        from: 'circuits',
        foreignField: '_id',
        localField: 'circuit._circuit',
        as: 'circuit'
      }
    },
    { $unwind: '$circuit' },
    { $project: { _id: 0, __v: 0, ergastId: 0 } }
  ])

  const [{ total, timings }] = await Timing.aggregate([
    { $match: filter },
    {
      $facet: {
        totalCount: [{
          $group: {
            _id: null,
            total: { $sum: 1 }
          }
        }],
        paginatedData: [
          { $sort: sort },
          { $skip: pagination.offset },
          { $limit: pagination.limit },
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
              weekend: 0
            }
          }
        ]
      }
    },
    { $unwind: '$totalCount' },
    {
      $project: {
        total: '$totalCount.total',
        timings: '$paginatedData'
      }
    }
  ])

  return {
    total,
    weekend,
    timings
  }
}

module.exports = filterTimings
