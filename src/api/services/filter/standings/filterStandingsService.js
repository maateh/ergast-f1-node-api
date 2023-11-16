// models
const Standings = require('../../../models/Standings')

// TODO: write service description
const filterStandingsService = async (
  filter = {},
  pagination = { limit: 30, offset: 0 },
  standingsType
) => {
  const [aggregatedData] = await Standings.aggregate([
    { $match: filter.primary },
    {
      $sort: {
        'season.year': 1,
        'weekend.round': -1
      }
    },
    {
      $group: {
        _id: '$season.year',
        standings: { $first: '$$ROOT' }
      }
    },
    { $unwind: `$standings.${standingsType}` },
    { $match: parseSecondaryFilter(standingsType, filter.secondary) },
    {
      $group: {
        _id: '$_id',
        lastWeekend: { $first: '$standings.weekend._weekend' },
        standings: { $push: `$standings.${standingsType}` }
      }
    },
    {
      $facet: {
        paginatedData: [
          { $sort: { _id: 1 } },
          { $skip: pagination.offset },
          { $limit: pagination.limit },
          {
            $lookup: {
              from: 'weekends',
              localField: 'lastWeekend',
              foreignField: '_id',
              as: 'lastWeekend'
            }
          },
          { $unwind: '$lastWeekend' }
        ],
        totalCount: [{
          $group: {
            _id: null,
            total: { $sum: 1 }
          }
        }]
      }
    },
    { $unwind: '$totalCount' },
    {
      $project: {
        standings: '$paginatedData',
        total: '$totalCount.total'
      }
    }
  ])

  return {
    standings: aggregatedData ? aggregatedData.standings : null,
    total: aggregatedData ? aggregatedData.total : 0
  }
}

// TODO: write util function description
function parseSecondaryFilter(standingsType, filter) {
  return Object.entries(filter)
    .reduce((parsedFilter, [key, value]) => {
      return {
        ...parsedFilter,
        [`standings.${standingsType}.${key}`]: value
      }
    }, {})
}

module.exports = filterStandingsService
