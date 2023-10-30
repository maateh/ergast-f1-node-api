const db = require('../database/mysql')

// models
const LapTime = require('../../api/models/lapTime')
const Weekend = require('../../api/models/weekend')
const Driver = require('../../api/models/driver')
const Team = require('../../api/models/team')

// utils
const { mapper } = require('../utils/mapper')

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

      const weekendsMap = mapper(weekends, 'ergastId')
      const driversMap = mapper(drivers, 'ref')
      const teamsMap = mapper(teams, 'ref')

      return lapTimes.map(lapTime => {
        const weekend = weekendsMap.get(lapTime.raceId)
        const driver = driversMap.get(lapTime.driverRef)
        const team = teamsMap.get(lapTime.constructorRef)

        return new LapTime({
          weekend: {
            year: weekend.year,
            round: weekend.round,
            _weekend: weekend._id,
            _season: weekend._season
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
