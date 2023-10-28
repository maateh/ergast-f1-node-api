// models
const Driver = require('../models/driver')
const Season = require('../models/season')
const Weekend = require('../models/weekend')

const getAllDrivers = (req, res, next) => {
  const { limit, offset } = req.query

  Driver.find()
    .sort({ 'name.lastName': 1 })
    .skip(offset)
    .limit(limit)
    .then(drivers => {
      // TODO: don't return the whole driver document
      res.status(200).json({ ...res.body, drivers })
    })
    .catch(err => {
      // TODO: error handling
      res.status(400).json({ success: false })
      console.log('getAllDrivers: ', err)
    })
}

const getDriversWithinASeason = (req, res, next) => {
  const { year } = req.params

  Season.findOne({ year }).populate('drivers._driver')
    .then(season => {
      const drivers = season.drivers.map(d => d._driver)

      // TODO: don't return the whole driver document
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
      const drivers = weekend.drivers.map(d => d._driver)

      // TODO: don't return the whole driver document
      res.status(200).json(drivers)
    })
    .catch(err => {
      // TODO: error handling
      console.log('getDriversWithinAWeekend: ', err)
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

module.exports = {
  getAllDrivers,
  getDriversWithinASeason,
  getDriversWithinAWeekend,
  getDriverInformation
}
