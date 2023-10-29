// models
const Driver = require('../../models/driver')

const getAllDrivers = async (req, res, next) => {
  const { limit, offset } = res.locals.pagination

  try {
    const total = await Driver.countDocuments()
    const drivers = await Driver.find()
      .sort({ 'name.lastName': 1 })
      .skip(offset)
      .limit(limit)

    // TODO: don't return the whole driver document
    res.json({
      metadata: res.locals.metadata,
      pagination: {
        ...res.locals.pagination,
        total
      },
      drivers
    })
  } catch (err) {
    // TODO: error handling
    res.status(500).json({ error: err })
    console.log('getAllDrivers: ', err)
  }
}

module.exports = getAllDrivers
