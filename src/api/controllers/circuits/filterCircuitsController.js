// services
const filterWithRegroupService = require('../../services/filter/filterWithRegroupService')

// models
const Result = require('../../models/Result')
const { simplifyCircuit } = require('../../models/Circuit')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getCircuitsFilteredByResults = async (req, res, next) => {
  const { metadata, filter, pagination } = res.locals

  try {
    const { data: circuits, total } = await filterWithRegroupService(Result, filter.results, pagination, {
      groupingField: 'circuit._circuit',
      targetCollection: 'circuits',
      sort: { name: 1 },
      requiredFields: {
        ref: 1,
        name: 1,
        location: 1,
        wiki: 1
      }
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
