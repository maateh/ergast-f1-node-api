const db = require('../database/mysql')

// models
const RaceResult = require('../../api/models/raceResult')

const getAllRaceResults = () => {
  const query = `
    SELECT SQL_CALC_FOUND_ROWS
      re.resultId, re.grid, re.position, re.positionText, re.positionOrder, re.number, re.points, re.laps, re.time, re.milliseconds, re.rank, re.fastestLap, re.fastestLapTime, re.fastestLapSpeed,
      ra.raceId, dr.driverRef, co.constructorRef,
      st.statusId, st.status
    FROM races ra, results re, drivers dr, constructors co, status st 
    WHERE ra.raceId=re.raceId AND re.driverId=dr.driverId AND re.constructorId=co.constructorId AND re.statusId=st.statusId ORDER BY ra.year, ra.round, re.positionOrder
  `

  return db.execute(query)
    .then(([raceResults]) => raceResults)
    .catch(err => {
      console.error('Query error: ', err)
    })
}

const conversion = () => {
  console.info('Circuits conversion started...')
  return getAllRaceResults()
    .then(raceResults => {
      return raceResults.map(result => {
        return new RaceResult({
          ergastId: result.resultId,
          grid: result.grid,
          position: {
            number: result.position,
            text: result.positionText,
            order: result.positionOrder
          },
          points: result.points,
          laps: result.laps,
          duration: {
            gap: result.time,
            ms: result.milliseconds
          },
          fastest: {
            rank: result.rank,
            lap: result.fastestLap,
            time: result.fastestLapTime,
            speed: result.fastestLapSpeed
          },
          // _weekend: ,
          // _driver: ,
          // _constructor: ,
        })
      })
    })
    .then(convertedRaceResults => {
      return RaceResult.insertMany(convertedRaceResults)
    })
    .then(() => {
      console.info('RaceResults conversion done!')
    })
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

module.exports = conversion
