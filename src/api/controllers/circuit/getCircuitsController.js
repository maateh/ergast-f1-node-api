// models
const Circuit = require('../../models/circuit')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getCircuitsController = async (req, res, next) => {
  const { limit, offset } = res.locals.pagination

  try {
    const total = await Circuit.countDocuments()
    const circuits = await Circuit.find()
      .sort({ name: 1 })
      .skip(offset)
      .limit(limit)

    if (!circuits || !circuits.length) {
      throw new DataNotFoundError('Circuits')
    }

    res.json({
      metadata: res.locals.metadata,
      pagination: {
        ...res.locals.pagination,
        total
      },
      circuits: circuits.map(c => c.simplify())
    })
  } catch (err) {
    next(err)
  }
}

module.exports = getCircuitsController
