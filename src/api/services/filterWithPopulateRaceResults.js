// models
const RaceResult = require('../models/RaceResult')

const filterWithPopulateRaceResults = async (filter, pagination, {
  targetCollection,
  populatingField,
  sortingByField
}) => {
  const total = await RaceResult.aggregate([
    { $match: filter },
    { $group: { _id: `$${populatingField}` } },
    { $count: 'total' }
  ])

  const data = await RaceResult.aggregate([
    { $match: filter },
    { $group: { _id: `$${populatingField}` } },
    {
      $lookup: {
        from: targetCollection,
        localField: '_id',
        foreignField: '_id',
        as: 'populatedDoc'
      }
    },
    { $unwind: '$populatedDoc' },
    { $sort: { [`populatedDoc.${sortingByField}`]: 1 } },
    { $limit: pagination.limit },
    { $skip: pagination.offset },
    {
      $project: {
        _id: 0,
        populatedDoc: 1
      }
    }
  ])

  return {
    data,
    total: total.length ? total[0].total : 0
  }
}

module.exports = filterWithPopulateRaceResults
