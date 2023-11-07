// services
const filterWithPopulateResults = require('../../services/filterWithPopulateResults')

// models
const { simplifyTeam } = require('../../models/Team')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getPopulatedTeamsFilteredByResults = async (req, res, next, resultType) => {
  const { metadata, filter, pagination } = res.locals

  try {
    const { data: teams, total } = await filterWithPopulateResults(resultType, filter, pagination, {
      targetCollection: 'teams',
      populatingField: 'team._team',
      sort: { name: 1 }
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
      teams: teams.map(t => simplifyTeam(t))
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getPopulatedTeamsFilteredByResults
}
