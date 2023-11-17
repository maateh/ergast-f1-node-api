// services
const filterStandingsService = require('../../services/filter/standings/filterStandingsService')

// models
const StandingsResponse = require('../../models/response/StandingsResponse')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getDriverStandings = async (req, res, next) => {
  const { metadata, pagination, filter } = res.locals

  try {
    const { standings, total } = await filterStandingsService(
      filter.standings,
      pagination,
      'driverStandings'
    )

    if (!standings || !standings.length) {
      throw new DataNotFoundError('DriverStandings')
    }

    res.json({
      metadata,
      pagination: {
        ...pagination,
        total
      },
      standings: StandingsResponse.parseList(standings)
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getDriverStandings
}
