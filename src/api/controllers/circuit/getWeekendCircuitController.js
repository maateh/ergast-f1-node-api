// models
const Weekend = require('../../models/weekend')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getWeekendCircuitController = async (req, res, next) => {
  const { year, round } = req.params

  try {
    const weekend = await Weekend.findOne({ year, round })
      .populate('circuit._circuit')
      .select('circuit._circuit')

    if (!weekend || !weekend.circuit) {
      throw new DataNotFoundError('Circuit')
    }

    res.json({
      metadata: res.locals.metadata,
      circuit: weekend.circuit._circuit.simplify()
    })
  } catch (err) {
    next(err)
  }
}

module.exports = getWeekendCircuitController
