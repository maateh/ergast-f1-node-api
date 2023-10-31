const db = require('../database/mysql')

// models
const SprintResult = require('../../api/models/sprintResult')
const Weekend = require('../../api/models/weekend')
const Driver = require('../../api/models/driver')
const Team = require('../../api/models/team')

// utils
const { mapper } = require('../utils/mapper')

const getAllSprintResults = () => {
  const query = `
    SELECT re.sprintResultId, re.grid, re.position, re.positionText, re.positionOrder, re.points, re.laps, re.time, re.milliseconds, re.fastestLap, re.fastestLapTime,
      ra.raceId, dr.driverRef, co.constructorRef,
      st.statusId, st.status
    FROM races ra, sprintresults re, drivers dr, constructors co, status st 
    WHERE ra.raceId=re.raceId AND re.driverId=dr.driverId AND re.constructorId=co.constructorId AND re.statusId=st.statusId ORDER BY ra.year, ra.round, re.positionOrder
  `

  console.info('Get sprint results from the SQL Database...')
  return db.execute(query)
    .then(([sprintResults]) => sprintResults)
    .catch(err => {
      console.error('Query error: ', err)
    })
}

const conversion = () => {
  console.info('SprintResults conversion started...')
  return Promise.all([
    getAllSprintResults(),
    Weekend.find(),
    Driver.find(),
    Team.find()
  ])
    .then(([sprintResults, weekends, drivers, teams]) => {
      console.info('Converting sprint results...')

      const weekendsMap = mapper(weekends, 'ergastId')
      const driversMap = mapper(drivers, 'ref')
      const teamsMap = mapper(teams, 'ref')

      return sprintResults.map(result => {
        const weekend = weekendsMap.get(result.raceId)
        const driver = driversMap.get(result.driverRef)
        const team = teamsMap.get(result.constructorRef)

        return new SprintResult({
          weekend: {
            year: weekend.season.year,
            round: weekend.round,
            _season: weekend.season._season,
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
          ergastId: result.sprintResultId,
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
          }
        })
      })
    })
    .then(convertedSprintResults => {
      console.info('Inserting SprintResults...')
      return SprintResult.insertMany(convertedSprintResults)
    })
    .then(() => {
      console.info('SprintResults conversion done!')
    })
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

module.exports = conversion
