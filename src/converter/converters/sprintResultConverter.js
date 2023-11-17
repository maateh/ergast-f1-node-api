const db = require('../database/mysql')

// models
const Result = require('../../api/models/mongoose/Result')

// utils
const { arrayToMapWithMultipleKeyRefs } = require('../utils/arrayToMap')
const getPositionInfo = require('../utils/racePositionInfo')
const convertTimeToMs = require('../utils/convertTimetoMs')

const getAllSprintResults = () => {
  const query = `
    SELECT re.sprintResultId, re.grid, re.position, re.positionText, re.positionOrder, re.points, re.laps, re.time, re.milliseconds, re.fastestLap, re.fastestLapTime,
      ra.raceId, dr.driverRef, co.constructorRef,
      st.statusId, st.status
    FROM races ra, sprintresults re, drivers dr, constructors co, status st 
    WHERE ra.raceId=re.raceId AND re.driverId=dr.driverId AND re.constructorId=co.constructorId AND re.statusId=st.statusId ORDER BY ra.year, ra.round, re.positionOrder
  `

  console.info('Get sprint results from the SQL Database...')
  return db.execute(query)
    .then(([sprintResults]) => sprintResults)
    .catch(err => {
      console.error('Query error: ', err)
    })
}

const conversion = () => {
  console.info('SprintResults conversion started...')
  return Promise.all([
    getAllSprintResults(),
    Result.find().populate('weekend._weekend')
  ])
    .then(([sprintResults, results]) => {
      console.info('Converting sprint results...')

      const sprintResultsMap = arrayToMapWithMultipleKeyRefs(sprintResults, [
        'raceId', 'driverRef', 'constructorRef'
      ])

      return results.map(result => {
        const sprintResult = sprintResultsMap[
          `${result.weekend._weekend.ergastId}${result.driver.ref}${result.team.ref}`
        ]

        if (sprintResult) {
          result.sprint = {
            grid: sprintResult.grid,
            position: {
              order: sprintResult.positionOrder,
              finished: !!sprintResult.position,
              info: getPositionInfo(sprintResult.positionText),
            },
            points: sprintResult.points,
            laps: sprintResult.laps,
            duration: {
              gap: sprintResult.time || undefined,
              ms: sprintResult.milliseconds || undefined
            },
            fastest: {
              rank: sprintResult.rank || undefined,
              lap: sprintResult.fastestLap || undefined,
              time: sprintResult.fastestLapTime || undefined,
              ms: sprintResult.fastestLapTime
                ? convertTimeToMs(sprintResult.fastestLapTime)
                : undefined,
              speed: sprintResult.fastestLapSpeed || undefined
            }
          }
        }
        return result
      })
    })
    .then(updatedResults => {
      console.info('Updating results with adding sprint results data...')
      return Result.bulkSave(updatedResults)
    })
    .then(() => {
      console.info('Results updated with sprint results data!')
    })
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

module.exports = conversion
