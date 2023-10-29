// models
const Weekend = require('../../models/weekend')

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
      res.status(500).json({ error: err })
      console.log('getDriversWithinAWeekend: ', err)
    })
}

module.exports = getDriversWithinAWeekend
