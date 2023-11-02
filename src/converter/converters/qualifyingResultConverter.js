const db = require('../database/mysql')

// models
const QualifyingResult = require('../../api/models/qualifyingResult')
const Weekend = require('../../api/models/weekend')
const Driver = require('../../api/models/driver')
const Team = require('../../api/models/team')

// utils
const arrayToMap = require('../utils/arrayToMap')

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
    Weekend.find(),
    Driver.find(),
    Team.find()
  ])
    .then(([qualifyingResults, weekends, drivers, teams]) => {
      console.info('Converting qualifying results...')

      const weekendsMap = arrayToMap(weekends, 'ergastId')
      const driversMap = arrayToMap(drivers, 'ref')
      const teamsMap = arrayToMap(teams, 'ref')

      return qualifyingResults.map(result => {
        const weekend = weekendsMap[result.raceId]
        const driver = driversMap[result.driverRef]
        const team = teamsMap[result.constructorRef]

        return new QualifyingResult({
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
          ergastId: result.qualifyId,
          position: result.position,
          q1: result.q1 || undefined,
          q2: result.q2 || undefined,
          q3: result.q3 || undefined
        })
      })
    })
    .then(convertedQualifyingResults => {
      console.info('Inserting QualifyingResults...')
      return QualifyingResult.bulkSave(convertedQualifyingResults)
    })
    .then(() => {
      console.info('QualifyingResults conversion done!')
    })
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

module.exports = conversion
