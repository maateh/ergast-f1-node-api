// TODO: write service description

// models
const Standings = require('../../../models/Standings')

const filterStandingsService = async (
  filter = {},
  pagination = { limit: 30, offset: 0 },
  standingsTypes = {
    driver: false,
    team: false
  }
) => {
  const [aggregatedData] = await Standings.aggregate([
    { $match: filter },
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
    {
      $facet: {
        paginatedData: [
          { $sort: { _id: 1 } },
          { $skip: pagination.offset },
          { $limit: pagination.limit },
          {
            $lookup: {
              from: 'weekends',
              localField: 'standings.weekend._weekend',
              foreignField: '_id',
              as: 'standings.weekend'
            }
          },
          { $unwind: '$standings.weekend' },
          {
            $replaceRoot: {
              newRoot: {
                weekend: '$standings.weekend',
                standings: getRequiredStandingsType(standingsTypes)
              }
            }
          }
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
    weekend: aggregatedData ? aggregatedData.weekend : null,
    standings: aggregatedData ? aggregatedData.standings : null,
    total: aggregatedData ? aggregatedData.total : 0
  }
}

function getRequiredStandingsType(standingsTypes) {
  if (standingsTypes.driver) {
    return '$standings.driverStandings'
  }

  if (standingsTypes.team) {
    return '$standings.teamStandings'
  }
}

module.exports = filterStandingsService
