// model
const Season = require('../../models/season')

const getSeasonDriversController = async (req, res, next) => {
  const { year } = req.params
  const { limit, offset } = res.locals.pagination

  try {
    const season = await Season.findOne({ year }, {
      'drivers._driver': true
    })
      .populate('drivers._driver')
      // TODO
      // .sort()
      // .skip(offset)
      // .limit(limit)
    const drivers = season.drivers.map(d => d._driver)

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
    res.status(500).json({ error: err.message })
    console.log('getSeasonDriversController: ', err)
  }
}

module.exports = getSeasonDriversController
