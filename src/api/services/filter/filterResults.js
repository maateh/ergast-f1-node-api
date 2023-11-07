// utils
const { getResultModel } = require('../../utils/filterResultsUtils')

const filterResults = async (
  resultType,
  filter = {},
  sort = {},
  pagination = { limit: 30, offset: 0 }
) => {
  const ResultModel = getResultModel(resultType, filter)

  const total = await ResultModel.aggregate([
    { $match: filter },
    { $count: 'total' }
  ])

  const results = await ResultModel.aggregate([
    { $match: filter },
    { $sort: sort },
    { $limit: pagination.limit },
    { $skip: pagination.offset },
    // TODO: populate -> season, weekend, driver, team, [+circuit?]
    // {
    //   $lookup: {
    //
    //   }
    // },
    { $project: { _id: 0, ergastId: 0, __v: 0 } }
  ])

  return {
    results,
    total: total.length ? total[0].total : 0
  }
}

module.exports = filterResults
