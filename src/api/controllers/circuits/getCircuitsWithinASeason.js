// models
const Weekend = require('../../models/weekend')

const getCircuitsWithinASeason = async (req, res, next) => {
  const { year } = req.params
  const { limit, offset } = res.locals.pagination

  try {
    const weekends = await Weekend.find({ year })
      .populate('circuit._circuit')
      // TODO
      // .sort()
      // .skip(offset)
      // .limit(limit)
    const circuits = weekends.map(w => w.circuit._circuit)

    // TODO: don't return the whole circuit document
    res.json({
      metadata: res.locals.metadata,
      pagination: {
        ...res.locals.pagination,
        total: circuits.length
      },
      circuits
    })
  } catch (err) {
    // TODO: error handling
    res.status(500).json({ error: err.message })
    console.log('getCircuitsWithinASeason: ', err)
  }
}

module.exports = getCircuitsWithinASeason
