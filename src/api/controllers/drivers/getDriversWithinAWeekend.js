// models
const Weekend = require('../../models/weekend')

const getDriversWithinAWeekend = async (req, res, next) => {
  const { year, round } = req.params

  // TODO
  // const { limit, offset } = res.locals.pagination

  try {
    const weekend = await Weekend.findOne({ year, round }, {
      'drivers._driver': true
    })
      .populate('drivers._driver')
      // TODO
      // .sort()
      // .skip(offset)
      // .limit(limit)
    const drivers = weekend.drivers.map(d => d._driver)

    // TODO: don't return the whole driver document
    res.json({
      metadata: res.locals.metadata,
      pagination: {
        ...res.locals.pagination,
        total: drivers.length
      },
      drivers
    })
  } catch (err) {
    // TODO: error handling
    res.status(500).json({ error: err })
    console.log('getDriversWithinAWeekend: ', err)
  }
}

module.exports = getDriversWithinAWeekend
