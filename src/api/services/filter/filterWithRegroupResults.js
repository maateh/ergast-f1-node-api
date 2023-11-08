// This service filters out results from a specified result collection
// (Race, Qualifying, Sprint - based on the provided "resultType") and
// allowing for sorting and pagination. It retrieves and populates relevant
// data from the target collection based on provided parameters.

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
    { $limit: pagination.limit },
    { $skip: pagination.offset },
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
