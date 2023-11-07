// models
const RaceResult = require('../models/RaceResult')
const QualifyingResult = require('../models/QualifyingResult')
const SprintResult = require('../models/SprintResult')

function getResultModel(resultType, filter) {
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

function getPaginationStages(sort, pagination = { limit: 30, offset: 0 }) {
  return [
    { $sort: sort },
    { $limit: pagination.limit },
    { $skip: pagination.offset },
  ]
}

module.exports = {
  getResultModel,
  getPaginationStages
}
