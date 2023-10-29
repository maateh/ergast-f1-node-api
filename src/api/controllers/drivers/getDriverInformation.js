// models
const Driver = require('../../models/driver')

const getDriverInformation = (req, res, next) => {
  const { id } = req.params

  Driver.findOne({ ref: id })
    .then(driver => {
      // TODO: don't return the whole driver document
      res.status(200).json(driver)
    })
    .catch(err => {
      // TODO: error handling
      res.status(500).json({ error: err })
      console.log('getDriverInformation: ', err)
    })
}

module.exports = getDriverInformation
