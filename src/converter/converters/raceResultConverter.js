const db = require('../database/mysql')

// models
const Result = require('../../api/models/mongoose/Result')
const Weekend = require('../../api/models/mongoose/Weekend')
const Driver = require('../../api/models/mongoose/Driver')
const Team = require('../../api/models/mongoose/Team')

// utils
const { arrayToMap } = require('../utils/arrayToMap')
const getPositionInfo = require('../utils/racePositionInfo')
const convertTimeToMs = require('../utils/convertTimetoMs')

const getAllRaceResults = () => {
  const query = `
    SELECT re.resultId, re.grid, re.position, re.positionText, re.positionOrder, re.points, re.laps, re.time, re.milliseconds, re.rank, re.fastestLap, re.fastestLapTime, re.fastestLapSpeed,
      ra.raceId, dr.driverRef, co.constructorRef,
      st.statusId, st.status
    FROM races ra, results re, drivers dr, constructors co, status st 
    WHERE ra.raceId=re.raceId AND re.driverId=dr.driverId AND re.constructorId=co.constructorId AND re.statusId=st.statusId ORDER BY ra.year, ra.round, re.positionOrder
  `

  console.info('Get race results from the SQL Database...')
  return db.execute(query)
    .then(([raceResults]) => raceResults)
    .catch(err => {
      console.error('Query error: ', err)
    })
}

const conversion = () => {
  console.info('RaceResults conversion started...')
  return Promise.all([
    getAllRaceResults(),
    Weekend.find(),
    Driver.find(),
    Team.find()
  ])
    .then(([raceResults, weekends, drivers, teams]) => {
      console.info('Converting race results...')

      const weekendsMap = arrayToMap(weekends, 'ergastId')
      const driversMap = arrayToMap(drivers, 'ref')
      const teamsMap = arrayToMap(teams, 'ref')

      return raceResults.map(result => {
        const weekend = weekendsMap[result.raceId]
        const driver = driversMap[result.driverRef]
        const team = teamsMap[result.constructorRef]

        return new Result({
          season: {
            year: weekend.season.year,
            _season: weekend.season._season
          },
          weekend: {
            round: weekend.round,
            _weekend: weekend._id
          },
          driver: {
            ref: driver.ref,
            _driver: driver._id
          },
          team: {
            ref: team.ref,
            _team: team._id
          },
          circuit: {
            ref: weekend.circuit.ref,
            _circuit: weekend.circuit._circuit
          },
          race: {
            grid: result.grid,
            position: {
              order: result.positionOrder,
              finished: !!result.position,
              info: getPositionInfo(result.positionText),
            },
            points: result.points,
            laps: result.laps,
            duration: {
              gap: result.time || undefined,
              ms: result.milliseconds || undefined
            },
            fastest: {
              rank: result.rank || undefined,
              lap: result.fastestLap || undefined,
              time: result.fastestLapTime || undefined,
              ms: result.fastestLapTime ? convertTimeToMs(result.fastestLapTime) : undefined,
              speed: result.fastestLapSpeed || undefined
            }
          }
        })
      })
    })
    .then(convertedRaceResults => {
      console.info('Inserting RaceResults...')
      return Result.insertMany(convertedRaceResults)
    })
    .then(() => {
      console.info('RaceResults conversion done!')
    })
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

module.exports = conversion
