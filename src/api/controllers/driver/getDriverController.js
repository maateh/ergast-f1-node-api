// models
const Driver = require('../../models/Driver')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getDriverController = async (req, res, next) => {
  const { id } = req.params

  try {
    const driver = await Driver.findOne({ ref: id })

    if (!driver) {
      throw new DataNotFoundError('Driver')
    }

    res.json({
      metadata: res.locals.metadata,
      driver: driver.simplify()
    })
  } catch (err) {
    next(err)
  }
}

module.exports = getDriverController
