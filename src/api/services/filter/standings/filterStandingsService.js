// models
const Standings = require('../../../models/mongoose/Standings')

/**
 * Retrieves filtered and paginated standings data based on specified criteria.
 *
 * @param {Object} filter - The filter criteria for the standings data.
 *   @param {Object} primary - Primary filter params to identify the required standings in the years.
 *   @param {Object} secondary - Secondary filter params to filter out the necessary standing results in a year.
 * @param {Object} pagination - Pagination options, including 'limit' and 'offset'.
 * @param {Object} standingsType - Type of the required standings data (options: 'driverStandings' || 'teamStandings')
 * @returns {Object} - An object containing paginated standings data and total count:
 *   @property {Array} standings - Paginated standings data.
 *   @property {number} total - Total count of standings data.
 */

const filterStandingsService = async (
  filter = {
    primary: {},
    secondary: {}
  },
  pagination = { limit: 30, offset: 0 },
  standingsType
) => {
  const [aggregatedData] = await Standings.aggregate([
    { $match: filter.primary },
    { $sort: { 'season.year': 1, 'weekend.round': -1 } },
    {
      $group: {
        _id: '$season.year',
        standings: { $first: '$$ROOT' }
      }
    },
    ...filterRequiredStandings(standingsType, filter.secondary),
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
          { $unwind: '$lastWeekend.circuit' },
          ...conditionalLookups(standingsType)
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

// TODO: write description
function filterRequiredStandings(standingsType, secondaryFilter) {
  let infoTargetCollection
  let infoRefKey

  switch (standingsType) {
    case 'driverStandings':
      infoRefKey = 'driver'
      infoTargetCollection = 'drivers'
      break
    case 'teamStandings':
      infoRefKey = 'team'
      infoTargetCollection = 'teams'
      break
    default:
      throw new Error(`Invalid standings type! (${standingsType})`)
  }

  return [
    { $unwind: `$standings.${standingsType}` },
    { $match: parseSecondaryFilter(standingsType, secondaryFilter) },
    {
      $lookup: {
        from: infoTargetCollection,
        localField: `standings.${standingsType}.${infoRefKey}._${infoRefKey}`,
        foreignField: '_id',
        as: `standings.${standingsType}.${infoRefKey}`
      }
    },
    { $unwind: `$standings.${standingsType}.${infoRefKey}` },
    {
      $group: {
        _id: '$_id',
        lastWeekend: { $first: '$standings.weekend._weekend' },
        [standingsType]: { $push: `$standings.${standingsType}` }
      }
    }
  ]
}

/**
 * Parses the given secondary filter based on the standings type.
 *
 * @param {string} standingsType - The type of standings data to be filtered.
 * @param {Object} filter - The secondary filter criteria for the standings data.
 * @returns {Object} - Gives back the same secondary filter with added a 'standings.' prefix for every key.
 */
function parseSecondaryFilter(standingsType, filter) {
  return Object.entries(filter)
    .reduce((parsedFilter, [key, value]) => {
      return {
        ...parsedFilter,
        [`standings.${standingsType}.${key}`]: value
      }
    }, {})
}

// TODO: write description
function conditionalLookups(standingsType) {
  // It's enough because we've already validated the standingsType
  const typeIsDriver = standingsType === 'driverStandings'

  const localField = `${standingsType}.${typeIsDriver ? 'teams' : 'drivers'}`

  return [
    { $unwind: `$${standingsType}` },
    {
      $lookup: {
        from: typeIsDriver ? 'teams' : 'drivers',
        localField: `${localField}._${typeIsDriver ? 'team' : 'driver'}`,
        foreignField: '_id',
        as: localField
      }
    },
    {
      $group: {
        _id: '$_id',
        lastWeekend: { $first: '$lastWeekend' },
        [standingsType]: { $push: `$${standingsType}` }
      }
    }
  ]
}

module.exports = filterStandingsService
