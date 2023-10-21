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
    Driver.findOne({ where: { driverRef: req.params.id }})
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
    // TODO: create associations
    // Season.findOne({ where: { year: req.params.year }})
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
    // TODO: create associations
    // Race.findOne({ where: { year: req.params.year, round: req.params.round }})
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
