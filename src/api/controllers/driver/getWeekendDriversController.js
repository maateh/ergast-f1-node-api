// models
const Weekend = require('../../models/weekend')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

// utils
const sorting = require('../../utils/sorting')

const getWeekendDriversController = async (req, res, next) => {
  const { year, round } = req.params
  const { limit, offset } = res.locals.pagination

  try {
    const weekend = await Weekend.findOne({ 'season.year': year, round })
      .populate('drivers._driver')
      .select('drivers._driver')

    if (!weekend || !weekend.drivers || !weekend.drivers.length) {
      throw new DataNotFoundError('Drivers')
    }

    const simplifiedDrivers = weekend.drivers.map(d => d._driver.simplify())
    const sortedDrivers = await sorting(simplifiedDrivers, 'name.lastName')
      .then(sortedDrivers => {
        return sortedDrivers.slice(offset, offset + limit)
      })

    res.json({
      metadata: res.locals.metadata,
      pagination: {
        ...res.locals.pagination,
        total: weekend.drivers.length
      },
      drivers: sortedDrivers
    })
  } catch (err) {
    next(err)
  }
}

module.exports = getWeekendDriversController
