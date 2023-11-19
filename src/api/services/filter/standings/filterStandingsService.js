// models
const Standings = require('../../../models/mongoose/Standings')

// TODO: write service description
const filterStandingsService = async (
  filter = {},
  pagination = { limit: 30, offset: 0 },
  options = {
    standingsTypeRefKey: '',
    infoRefKey: '',
    infoTargetCollection: ''
  }
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
    { $unwind: `$standings.${options.standingsTypeRefKey}` },
    { $match: parseSecondaryFilter(options.standingsTypeRefKey, filter.secondary) },
    {
      $group: {
        _id: '$_id',
        lastWeekend: { $first: '$standings.weekend._weekend' },
        [options.standingsTypeRefKey]: { $push: `$standings.${options.standingsTypeRefKey}` }
      }
    },
    {
      $facet: {
        paginatedData: [
          { $sort: { _id: 1 } },
          { $skip: pagination.offset },
          { $limit: pagination.limit },
          { $unwind: `$${options.standingsTypeRefKey}` },
          {
            $lookup: {
              from: options.infoTargetCollection,
              localField: `${options.standingsTypeRefKey}.${options.infoRefKey}._${options.infoRefKey}`,
              foreignField: '_id',
              as: `${options.standingsTypeRefKey}.${options.infoRefKey}`
            }
          },
          { $unwind: `$${options.standingsTypeRefKey}.${options.infoRefKey}` },
          {
            $group: {
              _id: '$_id',
              lastWeekend: { $first: '$lastWeekend' },
              [options.standingsTypeRefKey]: { $push: `$${options.standingsTypeRefKey}` }
            }
          },
          {
            $lookup: {
              from: 'weekends',
              localField: 'lastWeekend',
              foreignField: '_id',
              as: 'lastWeekend'
            }
          },
          { $unwind: '$lastWeekend' },
          {
            $lookup: {
              from: 'seasons',
              localField: 'lastWeekend.season._season',
              foreignField: '_id',
              as: 'lastWeekend.season'
            }
          },
          { $unwind: '$lastWeekend.season' },
          {
            $lookup: {
              from: 'circuits',
              localField: 'lastWeekend.circuit._circuit',
              foreignField: '_id',
              as: 'lastWeekend.circuit'
            }
          },
          { $unwind: '$lastWeekend.circuit' }
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
