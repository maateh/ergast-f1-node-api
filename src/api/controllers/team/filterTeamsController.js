// services
const filterWithPopulateResults = require('../../services/filterWithPopulateResults')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getPopulatedTeamsFilteredByResults = async (req, res, next, resultType) => {
  const { metadata, filter, pagination } = res.locals

  try {
    const { data: teams, total } = await filterWithPopulateResults(resultType, filter, pagination, {
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

module.exports = {
  getPopulatedTeamsFilteredByResults
}
