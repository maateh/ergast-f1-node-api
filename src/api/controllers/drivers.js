const Driver = require('../models/Driver')

const MOCK_DRIVER = new Driver({
  driverId: 'driverId',
  driverRef: 'driverRef',
  number: 'number',
  code: 'code',
  forename: 'forename',
  surname: 'surname',
  dob: 'dob',
  nationality: 'nationality',
  url: 'url'
})

module.exports = {
  getAllDrivers: (req, res, next) => {
    res.status(200).json([
      MOCK_DRIVER,
      MOCK_DRIVER,
      MOCK_DRIVER
    ])
  },
  getDriverInformation: (req, res, next) => {
    res.status(200).json(MOCK_DRIVER)
  },
  getDriversWithinAYear: (req, res, next) => {
    res.status(200).json([
      MOCK_DRIVER,
      MOCK_DRIVER,
      MOCK_DRIVER
    ])
  },
  getDriversWithinARace: (req, res, next) => {
    res.status(200).json([
      MOCK_DRIVER,
      MOCK_DRIVER,
      MOCK_DRIVER
    ])
  }
}
