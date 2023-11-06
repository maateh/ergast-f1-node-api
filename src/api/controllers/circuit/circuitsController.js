// models
const Circuit = require('../../models/Circuit')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getCircuitsController = async (req, res, next) => {
  const { metadata, pagination } = res.locals

  try {
    const total = await Circuit.countDocuments()
    const circuits = await Circuit.find()
      .sort('name')
      .skip(pagination.offset)
      .limit(pagination.limit)

    if (!circuits || !circuits.length) {
      throw new DataNotFoundError('Circuits')
    }

    res.json({
      metadata,
      pagination: {
        ...pagination,
        total
      },
      circuits: circuits.map(c => c.simplify())
    })
  } catch (err) {
    next(err)
  }
}

const getCircuitController = async (req, res, next) => {
  const { metadata } = res.locals
  const { id } = req.params

  try {
    const circuit = await Circuit.findOne({ ref: id })

    if (!circuit) {
      throw new DataNotFoundError('Circuit')
    }

    res.json({
      metadata,
      circuit: circuit.simplify()
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getCircuitsController,
  getCircuitController
}
