const Driver = require('../models/driver')
const Season = require('../models/season')
const Weekend = require('../models/weekend')

const getAllDrivers = (req, res, next) => {
  Driver.findAll()
    .then(drivers => {
      res.status(200).json(drivers)
    })
    .catch(err => {
      // TODO: error handling
      res.status(400).json({ success: false })
      console.log('getAllDrivers: ', err)
    })
}

const getDriverInformation = (req, res, next) => {
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
}

const getDriversWithinASeason = (req, res, next) => {
  const { year } = req.params

  // TODO: create associations
  // Season.findOne({ where: { year }})
  //   .then(drivers => {
  //     res.status(200).json(drivers)
  //   })
  //   .catch(err => {
  //     // TODO: error handling
  //     console.log('getDriversWithinASeason: ', err)
  //   })
  res.status(200).json({ success: true })
}

const getDriversWithinAWeekend = (req, res, next) => {
  const { year, round } = req.params

  // TODO: create associations
  // Weekend.findOne({ where: { year, round }})
  //   .then(drivers => {
  //     res.status(200).json(drivers)
  //   })
  //   .catch(err => {
  //     // TODO: error handling
  //     console.log('getDriversWithinAWeekend: ', err)
  //   })
  res.status(200).json({ success: true })
}

module.exports = {
  getAllDrivers,
  getDriverInformation,
  getDriversWithinASeason,
  getDriversWithinAWeekend
}
