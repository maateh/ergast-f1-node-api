// models
const RaceResult = require('../models/RaceResult')
const QualifyingResult = require('../models/QualifyingResult')
const SprintResult = require('../models/SprintResult')

// utils
const objectCleaner = require('../utils/objectCleaner')
const filterCommonElements = require('../utils/filterCommonElements')
const removeDuplicates = require('../utils/removeDuplicates')

const resultsFilter = async (query, filter, populateKey, selectKey, filterKeyRef) => {
  const {
    racePosition,
    raceGrid,
    raceFastest,
    qualifyingPosition,
    sprintPosition,
    sprintGrid
  } = query

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

  const qualifyingResults = qualifyingFilter
    ? await QualifyingResult.find({ ...filter, ...qualifyingFilter })
      .populate(populateKey)
      .select(selectKey)
    : []

  const sprintResults = sprintFilter
    ? await SprintResult.find({ ...filter, ...sprintFilter })
      .populate(populateKey)
      .select(selectKey)
    : []

  const raceResults = raceFilter || (!qualifyingFilter && !sprintFilter)
    ? await RaceResult.find({ ...filter, ...raceFilter })
      .populate(populateKey)
      .select(selectKey)
    : []

  const results = filterCommonElements(filterKeyRef, [
    raceResults, qualifyingResults, sprintResults
  ])

  return removeDuplicates(results, filterKeyRef, populateKey)
}

module.exports = resultsFilter
