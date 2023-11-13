/**
 * Retrieves and "regrouping" data from a specified collection (FilterModel)
 * based on provided filters, pagination and grouping options (included sorting).
 * Optionally includes additional lookups for related collections.
 *
 * @param {Model} FilterModel - The Mongoose model to perform aggregation on.
 * @param {Object} filter - The filter criteria to apply to the aggregation.
 * @param {Object} pagination - The pagination settings, including limit and offset.
 * @param {Object} options - Additional options for grouping, sorting, and required fields.
 * @param {Object} optionalLookups - Optional lookups for related collections.
 *
 * @returns {Object} An object containing paginated data and total count.
 * @property {Array|null} data - The paginated data based on the aggregation.
 * @property {number} total - The total count of documents matching the filter criteria.
 */

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
