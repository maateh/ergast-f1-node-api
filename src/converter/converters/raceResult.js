const db = require('../database/mysql')

// models
const RaceResult = require('../../api/models/raceResult')
const Weekend = require('../../api/models/weekend')
const Driver = require('../../api/models/driver')
const Constructor = require('../../api/models/constructor')

const getAllRaceResults = () => {
  const query = `
    SELECT SQL_CALC_FOUND_ROWS
      re.resultId, re.grid, re.position, re.positionText, re.positionOrder, re.number, re.points, re.laps, re.time, re.milliseconds, re.rank, re.fastestLap, re.fastestLapTime, re.fastestLapSpeed,
      ra.raceId, dr.driverRef, co.constructorRef,
      st.statusId, st.status
    FROM races ra, results re, drivers dr, constructors co, status st 
    WHERE ra.raceId=re.raceId AND re.driverId=dr.driverId AND re.constructorId=co.constructorId AND re.statusId=st.statusId ORDER BY ra.year, ra.round, re.positionOrder
  `

  console.info('Get race results from the SQL Database...')
  return db.execute(query)
    .then(([raceResults]) => raceResults)
    .catch(err => {
      console.error('Query error: ', err)
    })
}

const conversion = () => {
  console.info('RaceResults conversion started...')
  return Promise.all([
    getAllRaceResults(),
    Weekend.find(),
    Driver.find(),
    Constructor.find()
  ])
    .then(([raceResults, weekends, drivers, constructors]) => {
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
            gap: result.time || undefined,
            ms: result.milliseconds || undefined
          },
          fastest: {
            rank: result.rank || undefined,
            lap: result.fastestLap || undefined,
            time: result.fastestLapTime || undefined,
            speed: result.fastestLapSpeed || undefined
          },
          _weekend: weekends.find(w => w.ergastId === result.raceId),
          _driver: drivers.find(d => d.ref === result.driverRef),
          _constructor: constructors.find(c => c.ref === result.constructorRef)
        })
      })
    })
    .then(convertedRaceResults => {
      console.info('Inserting race results...')
      return RaceResult.insertMany(convertedRaceResults)
    })
    .then(() => {
      console.info('RaceResults conversion done!\n')
    })
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

module.exports = conversion
