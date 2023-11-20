// models
const Standings = require('../../../models/mongoose/Standings')

/**
 * Retrieves filtered and paginated standings data based on specified criteria.
 *
 * @param {Object} filter - The filter criteria for the standings data.
 *   @param {Object} primary - Primary filter params to identify the required standings in the years.
 *   @param {Object} secondary - Secondary filter params to filter out the necessary standing results in a year.
 * @param {Object} pagination - Pagination options, including 'limit' and 'offset'.
 * @param {Object} options - Additional options to identify and handle of the given type of standings data:
 *   @param {string} options.standingsTypeRefKey - The key referencing the type of standings data.
 *   @param {string} options.infoRefKey - The key referencing additional information in the standings data.
 *   @param {string} options.infoTargetCollection - The target collection for additional information lookup.
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
      $lookup: {
        from: options.infoTargetCollection,
        localField: `standings.${options.standingsTypeRefKey}.${options.infoRefKey}._${options.infoRefKey}`,
        foreignField: '_id',
        as: `standings.${options.standingsTypeRefKey}.${options.infoRefKey}`
      }
    },
    { $unwind: `$standings.${options.standingsTypeRefKey}.${options.infoRefKey}` },
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

module.exports = filterStandingsService
