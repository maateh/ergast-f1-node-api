const filterWithPopulateResults = async (Model, filter, pagination, {
  targetCollection,
  populatingField,
  sortingByField
}) => {
  const total = await Model.aggregate([
    { $match: filter },
    { $group: { _id: `$${populatingField}` } },
    { $count: 'total' }
  ])

  const data = await Model.aggregate([
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
    { $replaceWith: '$populatedDoc' },
    { $sort: { [sortingByField]: 1 } },
    { $limit: pagination.limit },
    { $skip: pagination.offset },
    { $project: { _id: 0, ergastId: 0, __v: 0 } }
  ])

  return {
    data,
    total: total.length ? total[0].total : 0
  }
}

module.exports = filterWithPopulateResults
