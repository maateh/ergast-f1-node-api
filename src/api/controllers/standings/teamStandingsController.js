// services
const filterStandingsService = require('../../services/filter/standings/filterStandingsService')

// models
const StandingsResponse = require('../../models/response/StandingsResponse')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getTeamStandings = async (req, res, next) => {
  const { metadata, pagination, filter } = res.locals

  try {
    const { standings, total } = await filterStandingsService(filter.standings, pagination, 'teamStandings')

    if (!standings || !standings.length) {
      throw new DataNotFoundError('TeamStandings')
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
  getTeamStandings
}
