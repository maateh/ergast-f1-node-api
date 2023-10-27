const db = require('../database/mysql')

// models
const QualifyingResult = require('../../api/models/qualifyingResult')
const Weekend = require('../../api/models/weekend')
const Driver = require('../../api/models/driver')
const Team = require('../../api/models/team')

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

      return qualifyingResults.map(result => {
        const weekend = weekends.find(w => w.ergastId === result.raceId)
        const driver = drivers.find(d => d.ref === result.driverRef)
        const team = teams.find(c => c.ref === result.constructorRef)

        return new QualifyingResult({
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
      console.info('QualifyingResults conversion done!\n')
    })
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

module.exports = conversion
