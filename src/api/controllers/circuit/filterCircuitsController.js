// services
const filterWithPopulateResults = require('../../services/filterWithPopulateResults')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getPopulatedCircuitsFilteredByResults = async (req, res, next, resultType) => {
  const { metadata, filter, pagination } = res.locals

  try {
    const { data: circuits, total } = await filterWithPopulateResults(resultType, filter, pagination, {
      targetCollection: 'circuits',
      populatingField: 'circuit._circuit',
      sort: { name: 1 }
    })

    if (!circuits || !circuits.length) {
      throw new DataNotFoundError('Circuits')
    }

    res.json({
      metadata,
      pagination: {
        ...pagination,
        total
      },
      circuits
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getPopulatedCircuitsFilteredByResults
}
