// models
const RaceResult = require('../../models/RaceResult')
const QualifyingResult = require('../../models/QualifyingResult')
const SprintResult = require('../../models/SprintResult')

// services
const filterWithPopulateResults = require('../../services/filterWithPopulateResults')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getPopulatedTeamsFilteredByResults = async (req, res, next, resultType) => {
  const { metadata, filter, pagination } = res.locals
  const Model = getResultModel(resultType, filter)

  try {
    const { data: teams, total } = await filterWithPopulateResults(Model, filter, pagination, {
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

const getResultModel = (resultType, filter) => {
  switch (resultType) {
    case 'race':
      return RaceResult
    case 'qualifying':
      filter.position = filter['position.order'] || filter.position
      delete filter['position.order']
      return QualifyingResult
    case 'sprint':
      return SprintResult
    default:
      throw new Error('Invalid resultType')
  }
}

module.exports = {
  getPopulatedTeamsFilteredByResults
}
