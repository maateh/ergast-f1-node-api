const db = require('../database/mysql')

// models
const LapTime = require('../../api/models/LapTime')
const Weekend = require('../../api/models/Weekend')
const Driver = require('../../api/models/Driver')
const Team = require('../../api/models/Team')

// utils
const arrayToMap = require('../utils/arrayToMap')

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
  console.info('LapTimes conversion started...')
  return Promise.all([
    getAllLapTimes(),
    Weekend.find(),
    Driver.find(),
    Team.find()
  ])
    .then(([lapTimes, weekends, drivers, teams]) => {
      console.info('Converting lap times...')

      const weekendsMap = arrayToMap(weekends, 'ergastId')
      const driversMap = arrayToMap(drivers, 'ref')
      const teamsMap = arrayToMap(teams, 'ref')

      return lapTimes.map(lapTime => {
        const weekend = weekendsMap[lapTime.raceId]
        const driver = driversMap[lapTime.driverRef]
        const team = teamsMap[lapTime.constructorRef]

        return new LapTime({
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
          lap: lapTime.lap,
          position: lapTime.position,
          duration: {
            time: lapTime.time,
            ms: lapTime.milliseconds
          }
        })
      })
    })
    .then(convertedLapTimes => {
      console.info('Inserting LapTimes...')
      return LapTime.insertMany(convertedLapTimes)
    })
    .then(() => {
      console.info('LapTimes conversion done!')
    })
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

module.exports = conversion
