// model
const Season = require('../../models/season')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

// utils
const { paginationWithSorting } = require('../../utils/pagination')

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

    res.json({
      metadata: res.locals.metadata,
      pagination: {
        ...res.locals.pagination,
        total: season.drivers.length
      },
      drivers: paginationWithSorting(simplifiedDrivers, limit, offset, 'name.lastName')
    })
  } catch (err) {
    next(err)
  }
}

module.exports = getSeasonDriversController
