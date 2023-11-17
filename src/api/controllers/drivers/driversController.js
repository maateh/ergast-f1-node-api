// models
const Driver = require('../../models/mongoose/Driver')
const DriverResponse = require('../../models/response/DriverResponse')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getDrivers = async (req, res, next) => {
  const { metadata, pagination } = res.locals

  try {
    const total = await Driver.countDocuments()
    const drivers = await Driver.find()
      .collation({ locale: 'en' })
      .sort('name.lastName')
      .skip(pagination.offset)
      .limit(pagination.limit)

    if (!drivers || !drivers.length) {
      throw new DataNotFoundError('Drivers')
    }

    res.json({
      metadata,
      pagination: {
        ...pagination,
        total
      },
      drivers: DriverResponse.parseList(drivers)
    })
  } catch (err) {
    next(err)
  }
}

const getDriver = async (req, res, next) => {
  const { metadata } = res.locals
  const { id } = req.params

  try {
    const driver = await Driver.findOne({ ref: id })

    if (!driver) {
      throw new DataNotFoundError('Driver')
    }

    res.json({
      metadata,
      driver: new DriverResponse(driver)
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getDrivers,
  getDriver
}
