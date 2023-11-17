const db = require('../database/mysql')

// models
const Timing = require('../../api/models/mongoose/Timing')
const Weekend = require('../../api/models/mongoose/Weekend')
const Driver = require('../../api/models/mongoose/Driver')
const Team = require('../../api/models/mongoose/Team')

// utils
const { arrayToMap } = require('../utils/arrayToMap')

const getAllLapTimes = () => {
  const query = `
    SELECT lt.lap, lt.position, lt.time, lt.milliseconds, 
      ra.date, ra.year, ra.round, lt.raceId, dr.driverRef, co.constructorRef
    FROM races ra, drivers dr, constructors co, laptimes lt
      LEFT JOIN results ON lt.raceId=results.raceId AND lt.driverId=results.driverId
    WHERE lt.raceId=ra.raceId AND lt.driverId=dr.driverId AND results.constructorId=co.constructorId
    ORDER BY lt.raceId, lt.lap DESC
  `

  console.info('Get lap times from the SQL Database...')
  return db.execute(query)
    .then(([lapTimes]) => lapTimes)
    .catch(err => {
      console.error('Query error: ', err)
    })
}

const conversion = () => {
  console.info('Timings conversion started...')
  return Promise.all([
    getAllLapTimes(),
    Weekend.find(),
    Driver.find(),
    Team.find()
  ])
    .then(([lapTimes, weekends, drivers, teams]) => {
      console.info('Converting timings...')

      const weekendsMap = arrayToMap(weekends, 'ergastId')
      const driversMap = arrayToMap(drivers, 'ref')
      const teamsMap = arrayToMap(teams, 'ref')

      return lapTimes.map(lapTime => {
        const weekend = weekendsMap[lapTime.raceId]
        const driver = driversMap[lapTime.driverRef]
        const team = teamsMap[lapTime.constructorRef]

        return new Timing({
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
          lap: lapTime.lap,
          position: lapTime.position,
          duration: {
            time: lapTime.time,
            ms: lapTime.milliseconds
          }
        })
      })
    })
    .then(convertedTimings => {
      console.info('Inserting Timings...')
      return Timing.insertMany(convertedTimings)
    })
    .then(() => {
      console.info('Timings conversion done!')
    })
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

module.exports = conversion
