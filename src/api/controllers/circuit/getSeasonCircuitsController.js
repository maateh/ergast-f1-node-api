// models
const Weekend = require('../../models/weekend')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getSeasonCircuitsController = async (req, res, next) => {
  const { year } = req.params
  const { limit, offset } = res.locals.pagination

  const filterCondition = { 'season.year': year }

  try {
    const total = await Weekend.countDocuments(filterCondition)
    const weekends = await Weekend.find(filterCondition)
      .populate('circuit._circuit')
      .select('circuit._circuit')
      .sort('circuit.ref')
      .skip(offset)
      .limit(limit)

    if (!weekends || !weekends.length || !weekends.find(w => w.circuit)) {
      throw new DataNotFoundError('Circuits')
    }

    res.json({
      metadata: res.locals.metadata,
      pagination: {
        ...res.locals.pagination,
        total
      },
      circuits: weekends.map(w => w.circuit._circuit.simplify())
    })
  } catch (err) {
    next(err)
  }
}

module.exports = getSeasonCircuitsController
