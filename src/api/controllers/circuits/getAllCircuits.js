// models
const Circuit = require('../../models/circuit')

const getAllCircuits = async (req, res, next) => {
  const { limit, offset } = req.locals.pagination

  try {
    const total = await Circuit.countDocuments()
    const circuits = await Circuit.find()
      .sort({ name: 1 })
      .skip(offset)
      .limit(limit)

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
    // TODO: error handling
    res.status(500).json({ error: err.message })
    console.log('getAllCircuits: ', err)
  }
}

module.exports = getAllCircuits
