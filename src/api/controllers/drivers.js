// models
const Driver = require('../models/driver')
const Season = require('../models/season')
const Weekend = require('../models/weekend')

const getAllDrivers = (req, res, next) => {
  Driver.find()
    .then(drivers => {
      // TODO: don't return the whole driver document
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

  Driver.findOne({ ref: id })
    .then(driver => {
      // TODO: don't return the whole driver document
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

  // TODO: save drivers (+teams)
  // separately on the Season model
  Season.findOne({ year }).populate('drivers._driver')
    .then(season => {
      // TODO: don't return the whole driver document
      const drivers = season.drivers.map(d => d._driver)
      res.status(200).json(drivers)
    })
    .catch(err => {
      // TODO: error handling
      console.log('getDriversWithinASeason: ', err)
    })
}

const getDriversWithinAWeekend = (req, res, next) => {
  const { year, round } = req.params

  Weekend.findOne({ year, round }).populate('drivers._driver')
    .then(weekend => {
      // TODO: don't return the whole driver document
      const drivers = weekend.drivers.map(d => d._driver)
      res.status(200).json(drivers)
    })
    .catch(err => {
      // TODO: error handling
      console.log('getDriversWithinAWeekend: ', err)
    })
}

module.exports = {
  getAllDrivers,
  getDriverInformation,
  getDriversWithinASeason,
  getDriversWithinAWeekend
}
