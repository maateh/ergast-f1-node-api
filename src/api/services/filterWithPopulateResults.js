// This service filters results from a specified result collection
// (Race, Qualifying, Sprint - based on the provided "resultType") and
// allowing for sorting and pagination. It retrieves and populates relevant
// data from the target collection based on provided parameters.

// models
const RaceResult = require('../models/RaceResult')
const QualifyingResult = require('../models/QualifyingResult')
const SprintResult = require('../models/SprintResult')

const filterWithPopulateResults = async (resultType, filter, pagination, {
  targetCollection,
  populatingField,
  sort,
  sortAndPaginationAfterPopulate = true
}) => {
  const ResultModel = getResultModel(resultType, filter)

  const sortAndPaginationStages = [
    { $sort: sort },
    { $limit: pagination.limit },
    { $skip: pagination.offset },
  ]

  const total = await ResultModel.aggregate([
    { $match: filter },
    { $group: { _id: `$${populatingField}` } },
    { $count: 'total' }
  ])

  const data = await ResultModel.aggregate([
    { $match: filter },
    { $group: { _id: `$${populatingField}` } },
    ...(sortAndPaginationAfterPopulate ? [] : sortAndPaginationStages),
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
    ...(sortAndPaginationAfterPopulate ? sortAndPaginationStages : []),
    { $project: { _id: 0, ergastId: 0, __v: 0 } }
  ])

  return {
    data,
    total: total.length ? total[0].total : 0
  }
}

const getResultModel = (resultType, filter) => {
  switch (resultType) {
    case 'race':
      return RaceResult
    case 'qualifying':
      filter.position = filter['position.order'] || filter.position
      delete filter['position.order']
      return QualifyingResult
    case 'sprint':
      return SprintResult
    default:
      throw new Error('Invalid resultType')
  }
}

module.exports = filterWithPopulateResults
