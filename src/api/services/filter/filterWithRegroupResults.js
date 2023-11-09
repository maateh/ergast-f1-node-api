/**
 * Aggregates and filters results from the 'Result' model with pagination and regrouping data.
 * @param {Object} filter - The filtering criteria for the aggregation.
 * @param {Object} pagination - The pagination options for the results (limit and offset).
 * @param {Object} options - Additional options for the aggregation:
 *   - groupingField: The field used for grouping results.
 *   - targetCollection: The target collection for the lookup.
 *   - sort: The sorting options for the results.
 *   - paginationBeforeLookup: Flag indicating if pagination should be applied before lookup.
 * @param {Array} additionalStages - Additional aggregation stages to be applied.
 * @returns {Object} An object with aggregated data and total count.
 */

// models
const Result = require('../../models/Result')

const filterWithRegroupResults = async (
  filter = {},
  pagination = { limit: 30, offset: 0 },
  { groupingField, targetCollection, sort, paginationBeforeLookup = false },
  additionalStages = []
) => {
  const total = await Result.aggregate([
    { $match: filter },
    { $group: { _id: `$${groupingField}` } },
    { $count: 'total' }
  ])

  const paginationStages = [
    { $sort: sort },
    { $skip: pagination.offset },
    { $limit: pagination.limit }
  ]

  const data = await Result.aggregate([
    { $match: filter },
    { $group: { _id: `$${groupingField}` } },
    ...(paginationBeforeLookup ? paginationStages : []),
    {
      $lookup: {
        from: targetCollection,
        localField: '_id',
        foreignField: '_id',
        as: 'populatedDoc'
      }
    },
    { $unwind: '$populatedDoc' },
    { $replaceWith: '$populatedDoc' },
    ...(paginationBeforeLookup ? [] : paginationStages),
    ...additionalStages,
    { $project: { _id: 0, ergastId: 0, __v: 0 } }
  ])

  return {
    data,
    total: total.length ? total[0].total : 0
  }
}

module.exports = filterWithRegroupResults
