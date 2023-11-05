// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

// services
const filterRaceResults = require('../../services/filterRaceResults')

const getRaceFilterTeamsController = async (req, res, next) => {
  const { metadata, filterParams, pagination } = res.locals

  try {
    const { data: teams, total } = await filterRaceResults(filterParams, pagination,
      'teams',
      'team',
      '_team',
      'name'
    )

    if (!teams || !teams.length) {
      throw new DataNotFoundError('Teams')
    }

    res.json({
      metadata,
      pagination: {
        ...pagination,
        total
      },
      teams
    })
  } catch (err) {
    next(err)
  }
}

module.exports = getRaceFilterTeamsController
