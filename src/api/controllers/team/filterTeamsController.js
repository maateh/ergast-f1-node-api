// services
const filterRaceResults = require('../../services/filterRaceResults')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getPopulatedTeamsFilteredByRaceResults = async (req, res, next) => {
  const { metadata, filter, pagination } = res.locals

  try {
    const { data: teams, total } = await filterRaceResults(filter, pagination, {
      targetCollection: 'teams',
      populatingField: 'team._team',
      sortingByField: 'name'
    })

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

const getPopulatedTeamsFilteredByQualifyingResults = async (req, res, next) => {
  // const { metadata, filter, pagination } = res.locals
}

const getPopulatedTeamsFilteredBySprintResults = async (req, res, next) => {
  // const { metadata, filter, pagination } = res.locals
}

module.exports = {
  getPopulatedTeamsFilteredByRaceResults,
  getPopulatedTeamsFilteredByQualifyingResults,
  getPopulatedTeamsFilteredBySprintResults
}
