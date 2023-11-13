// TODO: write service description

const filterWithRegroupService = async (
  FilterModel,
  filter = {},
  pagination = { limit: 30, offset: 0 },
  options = {
    groupingField: '_id',
    targetCollection: '',
    sort: {},
    sortingBeforeGrouping: false,
    requiredFields: {}
  },
  optionalLookups = { weekend: false }
) => {
  const paginationStages = [
    { $sort: options.sort },
    { $skip: pagination.offset },
    { $limit: pagination.limit }
  ]

  const [aggregatedData] = await FilterModel.aggregate([
    { $match: filter },
    ...(options.sortingBeforeGrouping ? paginationStages : []),
    { $group: { _id: `$${options.groupingField}` } },
    {
      $facet: {
        paginatedData: [
          {
            $lookup: {
              from: options.targetCollection,
              localField: '_id',
              foreignField: '_id',
              as: 'populatedDoc'
            }
          },
          { $unwind: '$populatedDoc' },
          { $replaceWith: '$populatedDoc' },
          ...(options.sortingBeforeGrouping ? [] : paginationStages),
          ...(optionalLookups.weekend ? [
            {
              $lookup: {
                from: 'seasons',
                foreignField: '_id',
                localField: 'season._season',
                as: 'season'
              }
            },
            { $unwind: '$season' },
            {
              $lookup: {
                from: 'circuits',
                foreignField: '_id',
                localField: 'circuit._circuit',
                as: 'circuit'
              }
            },
            { $unwind: '$circuit' },
          ] : []),
          { $project: { _id: 0, ...options.requiredFields } }
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
        data: '$paginatedData',
        total: '$totalCount.total'
      }
    }
  ])

  return {
    data: aggregatedData ? aggregatedData.data : null,
    total: aggregatedData ? aggregatedData.total : 0
  }
}

module.exports = filterWithRegroupService
