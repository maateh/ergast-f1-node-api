// models
const Driver = require('../../models/driver')

const getDriverInformation = async (req, res, next) => {
  const { id } = req.params

  try {
    const driver = await Driver.findOne({ ref: id })

    // TODO: don't return the whole driver document
    res.json({
      metadata: res.locals.metadata,
      driver
    })
  } catch (err) {
    // TODO: error handling
    res.status(500).json({ error: err.message })
    console.log('getDriverInformation: ', err)
  }
}

module.exports = getDriverInformation
