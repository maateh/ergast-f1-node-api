/**
 * Aggregates and filters results from the 'Result' model with pagination and required result types.
 * @param {Object} filter - The filtering criteria for the aggregation.
 * @param {Object} pagination - The pagination options for the results (limit and offset).
 * @param {Object} sort - The sorting options for the results.
 * @param {Object} requiredResults - The types of results to include (race, qualifying, sprint).
 * @returns {Object} An object with filtered and aggregated results along with the total count.
 */

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
  const [{ total, results }] = await Result.aggregate([
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
        ]
      }
    },
    { $unwind: '$totalCount' },
    {
      $project: {
        total: '$totalCount.total',
        results: '$paginatedData'
      }
    }
  ])

  return {
    total,
    results
  }
}

module.exports = filterResults
