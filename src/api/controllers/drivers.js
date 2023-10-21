const Driver = require('../models/driver')
const Season = require('../models/season')
const Race = require('../models/race')

module.exports = {
  getAllDrivers: (req, res, next) => {
    Driver.findAll()
      .then(drivers => {
        res.status(200).json(drivers)
      })
      .catch(err => {
        // TODO: error handling
        res.status(400).json({ success: false })
        console.log('getAllDrivers: ', err)
      })
  },
  getDriverInformation: (req, res, next) => {
    const { id } = req.params

    Driver.findOne({ where: { driverRef: id }})
      .then(driver => {
        res.status(200).json(driver)
      })
      .catch(err => {
        // TODO: error handling
        res.status(400).json({ success: false })
        console.log('getDriverInformation: ', err)
      })
  },
  getDriversWithinAYear: (req, res, next) => {
    const { year } = req.params

    // TODO: create associations
    // Season.findOne({ where: { year }})
    //   .then(drivers => {
    //     res.status(200).json(drivers)
    //   })
    //   .catch(err => {
    //     // TODO: error handling
    //     console.log('getDriversWithinAYear: ', err)
    //   })
    res.status(200).json({ success: true })
  },
  getDriversWithinARace: (req, res, next) => {
    const { year, round } = req.params

    // TODO: create associations
    // Race.findOne({ where: { year, round }})
    //   .then(drivers => {
    //     res.status(200).json(drivers)
    //   })
    //   .catch(err => {
    //     // TODO: error handling
    //     console.log('getDriversWithinARace: ', err)
    //   })
    res.status(200).json({ success: true })
  }
}
