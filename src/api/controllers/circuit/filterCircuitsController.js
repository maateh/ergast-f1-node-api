// services
const filterWithRegroupResults = require('../../services/filter/filterWithRegroupResults')

// models
const { simplifyCircuit } = require('../../models/Circuit')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getCircuitsFilteredByResults = async (req, res, next) => {
  const { metadata, filter, pagination } = res.locals

  try {
    const { data: circuits, total } = await filterWithRegroupResults(filter.results, pagination, {
      targetCollection: 'circuits',
      groupingField: 'circuit._circuit',
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
      circuits: circuits.map(c => simplifyCircuit(c))
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getCircuitsFilteredByResults
}
