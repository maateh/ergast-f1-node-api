// models
const RaceResult = require('../models/RaceResult')
const QualifyingResult = require('../models/QualifyingResult')
const SprintResult = require('../models/SprintResult')

// utils
const objectCleaner = require('../utils/objectCleaner')
const filterCommonElements = require('../utils/filterCommonElements')

const resultsFilter = async (queryFilter, filter, pagination, targetCollection, groupingId, populatingField, sortingKey) => {
  const {
    racePosition,
    raceGrid,
    raceFastest,
    qualifyingPosition,
    sprintPosition,
    sprintGrid
  } = queryFilter

  const raceFilter = objectCleaner({
    'position.order': racePosition,
    grid: raceGrid,
    fastest: raceFastest
  })

  const qualifyingFilter = objectCleaner({
    position: qualifyingPosition
  })

  const sprintFilter = objectCleaner({
    'position.order': sprintPosition,
    grid: sprintGrid
  })

  const aggregation = [
    {
      $group: {
        _id: `$${groupingId}`
      }
    },
    {
      $lookup: {
        from: targetCollection,
        localField: `_id.${populatingField}`,
        foreignField: '_id',
        as: groupingId
      }
    },
    { $unwind: `$${groupingId}` },
    {
      $sort: {
        [`${groupingId}.${sortingKey}`]: 1
      }
    },
    {
      $project: {
        _id: 0,
        [groupingId]: 1
      }
    }
  ]

  const qualifyingResults = qualifyingFilter
    ? await QualifyingResult.aggregate([
      { $match: { ...filter, ...qualifyingFilter } },
      ...aggregation
    ])
    : []

  const sprintResults = sprintFilter
    ? await SprintResult.aggregate([
      { $match: { ...filter, ...sprintFilter } },
      ...aggregation
    ])
    : []

  const raceResults = raceFilter || (!qualifyingFilter && !sprintFilter)
    ? await RaceResult.aggregate([
      { $match: { ...filter, ...raceFilter } },
      ...aggregation
    ])
    : []

  return filterCommonElements(`${groupingId}._id`, [
    raceResults, qualifyingResults, sprintResults
  ])
}

module.exports = resultsFilter
