// models
const Circuit = require('../../models/circuit')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getCircuitController = async (req, res, next) => {
  const { id } = req.params

  try {
    const circuit = await Circuit.findOne({ ref: id })

    if (!circuit) {
      throw new DataNotFoundError('Circuit')
    }

    res.json({
      metadata: res.locals.metadata,
      circuit: circuit.simplify()
    })
  } catch (err) {
    next(err)
  }
}

module.exports = getCircuitController
