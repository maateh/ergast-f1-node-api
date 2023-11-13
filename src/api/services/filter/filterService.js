// TODO: write service description

const filterService = async (
  Model,
  filter = {},
  pagination = { limit: 30, offset: 0 },
  sort = {},
  requiredFields = {},
  optionalLookups = { weekend: false, driver: false, team: false }
) => {
  const [aggregatedData] = await Model.aggregate([
    { $match: filter },
    {
      $facet: {
        paginatedData: [
          { $sort: sort },
          { $skip: pagination.offset },
          { $limit: pagination.limit },
          ...(optionalLookups.weekend ? [
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
          ] : []),
          ...(optionalLookups.driver ? [
            {
              $lookup: {
                from: 'drivers',
                foreignField: '_id',
                localField: 'driver._driver',
                as: 'driver'
              }
            },
            { $unwind: '$driver' },
          ] : []),
          ...(optionalLookups.team ? [
            {
              $lookup: {
                from: 'teams',
                foreignField: '_id',
                localField: 'team._team',
                as: 'team'
              }
            },
            { $unwind: '$team' },
          ] : []),
          { $project: { _id: 0, ...requiredFields } }
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

module.exports = filterService
