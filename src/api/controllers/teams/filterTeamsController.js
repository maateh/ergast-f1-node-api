// services
const filterWithRegroupService = require('../../services/filter/filterWithRegroupService')

// models
const Result = require('../../models/mongoose/Result')
const TeamResponse = require('../../models/response/TeamResponse')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getTeamsFilteredByResults = async (req, res, next) => {
  const { metadata, filter, pagination } = res.locals

  try {
    const { data: teams, total } = await filterWithRegroupService(Result, filter.results, pagination, {
      groupingField: 'team._team',
      targetCollection: 'teams',
      sort: { name: 1 },
      requiredFields: {
        ref: 1,
        name: 1,
        nationality: 1,
        wiki: 1
      }
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
      teams: TeamResponse.parseList(teams)
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getTeamsFilteredByResults
}
