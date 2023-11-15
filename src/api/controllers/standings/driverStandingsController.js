// services
const filterService = require('../../services/filter/filterService')

// models
const DriverStandings = require('../../models/DriverStandings')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getDriverStandings = async (req, res, next) => {
  const { metadata, pagination, filter } = res.locals

  try {
    const { data: standings, total } = await filterService(DriverStandings, filter.standings, pagination, {
      'season.year': 1,
      'weekend.round': 1,
      'position.order': 1
    })

    if (!standings || !standings.length) {
      throw new DataNotFoundError('DriverStandings')
    }

    res.json({
      metadata,
      pagination: {
        ...pagination,
        total
      },
      // TODO: create simplify method
      // standings: standings.map(st => simplifyStanding(st))
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getDriverStandings
}
