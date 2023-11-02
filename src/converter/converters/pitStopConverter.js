const db = require('../database/mysql')

// models
const PitStop = require('../../api/models/pitStop')
const Weekend = require('../../api/models/weekend')
const Driver = require('../../api/models/driver')
const Team = require('../../api/models/team')

// utils
const arrayToMap = require('../utils/arrayToMap')

const getAllPitStops = () => {
  const query = `
    SELECT pi.stop, pi.lap, pi.time, pi.duration, pi.milliseconds, pi.raceId, 
      ra.date, ra.year, ra.round, dr.driverRef, co.constructorRef
    FROM races ra, drivers dr, constructors co, pitstops pi
      LEFT JOIN results ON pi.raceId=results.raceId AND pi.driverId=results.driverId
    WHERE pi.raceId=ra.raceId AND pi.driverId=dr.driverId AND results.constructorId=co.constructorId
    ORDER BY pi.raceId DESC
  `

  console.info('Get pit stops from the SQL Database...')
  return db.execute(query)
    .then(([pitStops]) => pitStops)
    .catch(err => {
      console.error('Query error: ', err)
    })
}

const conversion = () => {
  console.info('PitStops conversion started...')
  return Promise.all([
    getAllPitStops(),
    Weekend.find(),
    Driver.find(),
    Team.find()
  ])
    .then(([pitStops, weekends, drivers, teams]) => {
      console.info('Converting pit stops...')

      const weekendsMap = arrayToMap(weekends, 'ergastId')
      const driversMap = arrayToMap(drivers, 'ref')
      const teamsMap = arrayToMap(teams, 'ref')

      return pitStops.map(pitStop => {
        const weekend = weekendsMap[pitStop.raceId]
        const driver = driversMap[pitStop.driverRef]
        const team = teamsMap[pitStop.constructorRef]

        return new PitStop({
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
          stop: pitStop.stop,
          lap: pitStop.lap,
          timeOfDay: new Date(`${pitStop.date.toISOString().split('T')[0]}T${pitStop.time}Z`),
          duration: {
            time: pitStop.duration,
            ms: pitStop.milliseconds
          }
        })
      })
    })
    .then(convertedPitStops => {
      console.info('Inserting PitStops...')
      return PitStop.insertMany(convertedPitStops)
    })
    .then(() => {
      console.info('PitStops conversion done!')
    })
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

module.exports = conversion
