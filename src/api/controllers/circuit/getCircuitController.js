// models
const Circuit = require('../../models/circuit')

const getCircuitController = async (req, res, next) => {
  const { id } = req.params

  try {
    const circuit = await Circuit.findOne({ ref: id })

    if (!circuit) {
      const error = new Error('Circuit not found!')
      error.statusCode = 404
      throw error
    }

    // TODO: don't return the whole circuit document
    res.json({
      metadata: res.locals.metadata,
      circuit
    })
  } catch (err) {
    next(err)
  }
}

module.exports = getCircuitController
