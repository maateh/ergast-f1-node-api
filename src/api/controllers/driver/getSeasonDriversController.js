// model
const Season = require('../../models/season')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

// utils
const sorting = require('../../utils/sorting')

const getSeasonDriversController = async (req, res, next) => {
  const { year } = req.params
  const { limit, offset } = res.locals.pagination

  try {
    const season = await Season.findOne({ year })
      .populate('drivers._driver')
      .select('drivers._driver')

    if (!season || !season.drivers || !season.drivers.length) {
      throw new DataNotFoundError('Drivers')
    }

    const simplifiedDrivers = season.drivers.map(d => d._driver.simplify())
    const sortedDrivers = await sorting(simplifiedDrivers, 'name.lastName')
      .then(sortedDrivers => {
        return sortedDrivers.slice(offset, offset + limit)
      })

    res.json({
      metadata: res.locals.metadata,
      pagination: {
        ...res.locals.pagination,
        total: season.drivers.length
      },
      drivers: sortedDrivers
    })
  } catch (err) {
    next(err)
  }
}

module.exports = getSeasonDriversController
