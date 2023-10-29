// model
const Season = require('../../models/season')

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
      res.status(500).json({ error: err })
      console.log('getDriversWithinASeason: ', err)
    })
}

module.exports = getDriversWithinASeason
