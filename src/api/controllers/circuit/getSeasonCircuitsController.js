// models
const Weekend = require('../../models/weekend')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getSeasonCircuitsController = async (req, res, next) => {
  const { year } = req.params
  const { limit, offset } = res.locals.pagination

  const filterCondition = { year }

  try {
    const total = await Weekend.countDocuments(filterCondition)
    const weekends = await Weekend.find(filterCondition)
      .populate('circuit._circuit')
      .select('circuit._circuit')
      .sort('circuit.ref')
      .skip(offset)
      .limit(limit)
    const circuits = weekends.map(w => w.circuit._circuit)

    if (!circuits || !circuits.length) {
      throw new DataNotFoundError('Circuits')
    }

    // TODO: don't return the whole circuit document
    res.json({
      metadata: res.locals.metadata,
      pagination: {
        ...res.locals.pagination,
        total
      },
      circuits
    })
  } catch (err) {
    next(err)
  }
}

module.exports = getSeasonCircuitsController
