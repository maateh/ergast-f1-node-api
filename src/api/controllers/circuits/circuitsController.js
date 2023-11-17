// models
const Circuit = require('../../models/mongoose/Circuit')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')
const CircuitResponse = require('../../models/response/CircuitResponse')

const getCircuits = async (req, res, next) => {
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
      circuits: CircuitResponse.parseList(circuits)
    })
  } catch (err) {
    next(err)
  }
}

const getCircuit = async (req, res, next) => {
  const { metadata } = res.locals
  const { id } = req.params

  try {
    const circuit = await Circuit.findOne({ ref: id })

    if (!circuit) {
      throw new DataNotFoundError('Circuit')
    }

    res.json({
      metadata,
      circuit: new CircuitResponse(circuit)
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getCircuits,
  getCircuit
}
