const db = require('../database/mysql')

// models
const Result = require('../../api/models/Result')

// utils
const { arrayToMapWithMultipleKeyRefs } = require('../utils/arrayToMap')
const convertTimeToMs = require('../utils/convertTimetoMs')

const getAllQualifyingResults = () => {
  const query = `
    SELECT qu.qualifyId, qu.position, qu.q1, qu.q2, qu.q3, ra.raceId, dr.driverRef, co.constructorRef 
    FROM races ra, qualifying qu, drivers dr, constructors co
    WHERE qu.raceId=ra.raceId AND qu.driverId=dr.driverId AND qu.constructorId=co.constructorId
    ORDER BY ra.year, ra.round, qu.position 
  `

  console.info('Get qualifying results from the SQL Database...')
  return db.execute(query)
    .then(([qualifyingResults]) => qualifyingResults)
    .catch(err => {
      console.error('Query error: ', err)
    })
}

const conversion = () => {
  console.info('QualifyingResults conversion started...')
  return Promise.all([
    getAllQualifyingResults(),
    Result.find().populate('weekend._weekend')
  ])
    .then(([qualifyingResults, results]) => {
      console.info('Converting qualifying results...')

      const qualifyingResultsMap = arrayToMapWithMultipleKeyRefs(qualifyingResults, [
        'raceId', 'driverRef', 'constructorRef'
      ])

      return results.map(result => {
        const qualifyingResult = qualifyingResultsMap[
          `${result.weekend._weekend.ergastId}${result.driver.ref}${result.team.ref}`
        ]

        if (qualifyingResult) {
          result.qualifying = {
            position: qualifyingResult.position,
            q1: {
              time: qualifyingResult.q1 || '-',
              ms: qualifyingResult.q1
                ? convertTimeToMs(qualifyingResult.q1)
                : undefined
            },
            q2: result.season.year >= 2006 ? {
              time: qualifyingResult.q2 || '-',
              ms: qualifyingResult.q2
                ? convertTimeToMs(qualifyingResult.q2)
                : undefined
            } : undefined,
            q3: result.season.year >= 2006 ? {
              time: qualifyingResult.q3 || '-',
              ms: qualifyingResult.q3
                ? convertTimeToMs(qualifyingResult.q3)
                : undefined
            } : undefined
          }
        }
        return result
      })
    })
    .then(updatedResults => {
      console.info('Updating results with adding qualifying results data...')
      return Result.bulkSave(updatedResults)
    })
    .then(() => {
      console.info('Results updated with qualifying results data!')
    })
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

module.exports = conversion
