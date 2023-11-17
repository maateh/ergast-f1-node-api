const db = require('../database/mysql')

// models
const Standings = require('../../api/models/mongoose/Standings')
const Weekend = require('../../api/models/mongoose/Weekend')
const Driver = require('../../api/models/mongoose/Driver')
const Team = require('../../api/models/mongoose/Team')

// utils
const { arrayToMap, arrayToPushMap } = require('../utils/arrayToMap')

const getAllDriverStandings = () => {
  const query = 'SELECT * FROM driverstandings ORDER BY raceId, position ASC'

  console.info('Get driver standings data from the MySQL Database...')
  return db.execute(query)
    .then(([driverStandingsData]) => driverStandingsData)
    .catch(err => {
      console.error('Query error: ', err)
    })
}

const getAllConstructorStandings = () => {
  const query = 'SELECT * FROM constructorstandings ORDER BY raceId, position ASC'

  console.info('Get constructor standings data from the MySQL Database...')
  return db.execute(query)
    .then(([constructorStandingsData]) => constructorStandingsData)
    .catch(err => {
      console.error('Query error: ', err)
    })
}

const conversion = () => {
  console.info('Standings conversion started...')
  return Promise.all([
    getAllDriverStandings(),
    getAllConstructorStandings(),
    Weekend.find().sort({
      'season.year': -1,
      round: -1
    }),
    Driver.find(),
    Team.find()
  ])
    .then(([driverStandingsData, constructorStandingsData, weekends, drivers, teams]) => {
      console.info('Converting standings data...')

      const driverStandingsMap = arrayToPushMap(driverStandingsData, 'raceId')
      const constructorStandingsMap = arrayToPushMap(constructorStandingsData, 'raceId')
      const driversMap = arrayToMap(drivers, 'ergastId')
      const teamsMap = arrayToMap(teams, 'ergastId')

      return weekends.reduce((standings, weekend) => {
        const currentDriverStandings = driverStandingsMap[weekend.ergastId]
        const currentConstructorStandings = constructorStandingsMap[weekend.ergastId]

        // Doesn't need to store standings on weekends
        // which haven't yet been held.
        if (!currentDriverStandings && !currentConstructorStandings) {
          return standings
        }

        const currentStandings = new Standings({
          season: {
            year: weekend.season.year,
            _season: weekend.season._season
          },
          weekend: {
            round: weekend.round,
            _weekend: weekend._id
          },
          driverStandings: currentDriverStandings.map(dst => {
            const currentDriver = driversMap[dst.driverId]

            return {
              ergastId: dst.driverStandingsId,
              driver: {
                ref: currentDriver.ref,
                _driver: currentDriver._id
              },
              // TODO: teams: ,
              points: dst.points,
              position: {
                order: dst.position,
                info: dst.positionText
              },
              wins: dst.wins
            }
          }),
          teamStandings: currentConstructorStandings?.map(cst => {
            const currentTeam = teamsMap[cst.constructorId]

            return {
              ergastId: cst.constructorStandingsId,
              team: {
                ref: currentTeam.ref,
                _team: currentTeam._id
              },
              // TODO: drivers: ,
              points: cst.points,
              position: {
                order: cst.position,
                info: cst.positionText
              },
              wins: cst.wins
            }
          }),
        })
        standings.push(currentStandings)
        return standings
      }, [])
    })
    .then(convertedStandings => {
      console.info('Inserting standings data...')
      return Standings.insertMany(convertedStandings)
    })
    .then(() => {
      console.info('Standings conversion done!')
    })
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

module.exports = conversion
