const db = require('../database/mysql')

// models
const DriverStandings = require('../../api/models/DriverStandings')
const Weekend = require('../../api/models/Weekend')
const Driver = require('../../api/models/Driver')

// utils
const { arrayToMap } = require('../utils/arrayToMap')

const getAllDriverStandings = () => {
  const query = 'SELECT * FROM driverstandings'

  console.info('Get driver standings data from the MySQL Database...')
  return db.execute(query)
    .then(([driverStandingsData]) => driverStandingsData)
    .catch(err => {
      console.error('Query error: ', err)
    })
}

const conversion = () => {
  console.info('DriverStandings conversion started...')
  return Promise.all([
    getAllDriverStandings(),
    Weekend.find(),
    Driver.find()
  ])
    .then(([driverStandingsData, weekends, drivers]) => {
      console.info('Converting driver standings data...')

      const weekendsMap = arrayToMap(weekends, 'ergastId')
      const driversMap = arrayToMap(drivers, 'ergastId')

      return driverStandingsData.map(standingsData => {
        const weekend = weekendsMap[standingsData.raceId]
        const driver = driversMap[standingsData.driverId]

        return new DriverStandings({
          ergastId: standingsData.driverStandingsId,
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
          // TODO: solve teams problem
          // teams: {
          //   ref: result.team.ref,
          //   _team: result.team._id
          // },
          points: standingsData.points,
          position: {
            order: standingsData.position,
            info: standingsData.positionText
          },
          wins: standingsData.wins
        })
      })
    })
    .then(convertedDriverStandings => {
      console.info('Inserting driver standings data...')
      return DriverStandings.insertMany(convertedDriverStandings)
    })
    .then(() => {
      console.info('DriverStandings conversion done!')
    })
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

module.exports = conversion
