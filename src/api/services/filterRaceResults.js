// models
const RaceResult = require('../models/RaceResult')

// utils
const objectCleaner = require('../utils/objectCleaner')

const filterRaceResults = async (filterParams, pagination, targetCollection, groupingId, populatingField, sortingKey) => {
  const {
    circuitId,
    driverId,
    teamId,
    position,
    grid,
    fastest,
    points,
    year,
    round
  } = filterParams

  const filter = objectCleaner({
    'season.year': year,
    'weekend.round': round,
    'circuit.ref': circuitId,
    'driver.ref': driverId,
    'team.ref': teamId
  })

  const resultsFilter = objectCleaner({
    'position.order': position,
    grid,
    fastest,
    points: points ? { $gte: points } : undefined
  })

  const total = await RaceResult.aggregate([
    { $match: { ...filter, ...resultsFilter } },
    {
      $group: {
        _id: `$${groupingId}`
      }
    },
    { $count: 'total' }
  ])

  const data = await RaceResult.aggregate([
    { $match: { ...filter, ...resultsFilter } },
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
    { $limit: pagination.limit },
    { $skip: pagination.offset },
    {
      $project: {
        _id: 0,
        [groupingId]: 1
      }
    }
  ])

  return { data, total: total[0]?.total }
}

module.exports = filterRaceResults
