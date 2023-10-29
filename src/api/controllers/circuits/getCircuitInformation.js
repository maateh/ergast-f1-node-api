// models
const Circuit = require('../../models/circuit')

const getCircuitInformation = async (req, res, next) => {
  const { id } = req.params

  try {
    const circuit = await Circuit.findOne({ ref: id })

    // TODO: don't return the whole circuit document
    res.json({
      metadata: res.locals.metadata,
      circuit
    })
  } catch (err) {
    // TODO: error handling
    res.status(500).json({ error: err.message })
    console.log('getCircuitInformation: ', err)
  }
}

module.exports = getCircuitInformation
