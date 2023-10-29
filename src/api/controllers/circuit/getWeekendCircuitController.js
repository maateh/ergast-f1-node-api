// models
const Weekend = require('../../models/weekend')

const getWeekendCircuitController = async (req, res, next) => {
  const { year, round } = req.params

  try {
    const weekend = await Weekend.findOne({ year, round })
      .populate('circuit._circuit')
    const circuit = weekend.circuit._circuit

    // TODO: don't return the whole circuit document
    res.json({
      metadata: res.locals.metadata,
      circuit
    })
  } catch (err) {
    // TODO: error handling
    res.status(500).json({ error: err.message })
    console.log('getWeekendCircuitController: ', err)
  }
}

module.exports = getWeekendCircuitController
