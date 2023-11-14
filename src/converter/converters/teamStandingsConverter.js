const db = require('../database/mysql')

// models
const TeamStandings = require('../../api/models/TeamStandings')
const Weekend = require('../../api/models/Weekend')
const Team = require('../../api/models/Team')

// utils
const { arrayToMap } = require('../utils/arrayToMap')

const getAllConstructorStandings = () => {
  const query = 'SELECT * FROM constructorstandings'

  console.info('Get constructor standings data from the MySQL Database...')
  return db.execute(query)
    .then(([constructorStandingsData]) => constructorStandingsData)
    .catch(err => {
      console.error('Query error: ', err)
    })
}

const conversion = () => {
  console.info('TeamStandings conversion started...')
  return Promise.all([
    getAllConstructorStandings(),
    Weekend.find(),
    Team.find()
  ])
    .then(([constructorStandingsData, weekends, teams]) => {
      console.info('Converting constructor standings data...')

      const weekendsMap = arrayToMap(weekends, 'ergastId')
      const teamsMap = arrayToMap(teams, 'ergastId')

      return constructorStandingsData.map(standingsData => {
        const weekend = weekendsMap[standingsData.raceId]
        const team = teamsMap[standingsData.constructorId]

        return new TeamStandings({
          ergastId: standingsData.constructorStandingsId,
          season: {
            year: weekend.season.year,
            _season: weekend.season._season
          },
          weekend: {
            round: weekend.round,
            _weekend: weekend._id
          },
          team: {
            ref: team.ref,
            _team: team._id
          },
          // TODO: solve drivers problem
          // drivers: {
          //   ref: result.driver.ref,
          //   _driver: result.driver._id
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
    .then(convertedTeamStandings => {
      console.info('Inserting team standings data...')
      return TeamStandings.insertMany(convertedTeamStandings)
    })
    .then(() => {
      console.info('TeamStandings conversion done!')
    })
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

module.exports = conversion
