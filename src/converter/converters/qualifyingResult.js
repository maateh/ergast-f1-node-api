const db = require('../database/mysql')

// models
const QualifyingResult = require('../../api/models/qualifyingResult')

const getAllQualifyingResults = () => {
  const query = `
    SELECT SQL_CALC_FOUND_ROWS
      qu.qualifyId, qu.position, qu.q1, qu.q2, qu.q3, 
      ra.raceId, dr.driverRef, co.constructorRef 
    FROM races ra, qualifying qu, drivers dr, constructors co
    WHERE qu.raceId=ra.raceId AND qu.driverId=dr.driverId AND qu.constructorId=co.constructorId
    ORDER BY ra.year, ra.round, qu.position 
  `

  return db.execute(query)
    .then(([qualifyingResults]) => qualifyingResults)
    .catch(err => {
      console.error('Query error: ', err)
    })
}

const conversion = () => {
  console.info('QualifyingResults conversion started...')
  return getAllQualifyingResults()
    .then(qualifyingResults => {
      return qualifyingResults.map(result => {
        return new QualifyingResult({
          ergastId: result.qualifyId,
          position: result.position,
          q1: result.q1,
          q2: result.q2,
          q3: result.q3,
          // _weekend: ,
          // _driver: ,
          // _constructor: ,
        })
      })
    })
    .then(convertedQualifyingResults => {
      return QualifyingResult.insertMany(convertedQualifyingResults)
    })
    .then(() => {
      console.info('QualifyingResults conversion done!')
    })
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

module.exports = conversion
