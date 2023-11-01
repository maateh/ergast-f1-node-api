// models
const Driver = require('../../models/driver')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getDriversController = async (req, res, next) => {
  const { limit, offset } = res.locals.pagination

  try {
    const total = await Driver.countDocuments()
    const drivers = await Driver.find()
      .collation({ locale: 'en' })
      .sort('name.lastName')
      .skip(offset)
      .limit(limit)

    if (!drivers || !drivers.length) {
      throw new DataNotFoundError('Drivers')
    }

    res.json({
      metadata: res.locals.metadata,
      pagination: {
        ...res.locals.pagination,
        total
      },
      drivers: drivers.map(d => d.simplify())
    })
  } catch (err) {
    next(err)
  }
}

module.exports = getDriversController
