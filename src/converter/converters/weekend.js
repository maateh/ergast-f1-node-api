const db = require('../database/mysql')

// models
const Weekend = require('../../api/models/weekend')
const Circuit = require('../../api/models/circuit')

const getAllWeekends = () => {
  const query = 'SELECT * FROM races'

  return db.execute(query)
    .then(([races]) => races)
    .catch(err => {
      console.error('Query error: ', err)
    })
}

const conversion = () => {
  return Promise.all([getAllWeekends(), Circuit.find()])
    .then(([races, circuits]) => {
      return races.map(race => {
        const date = race.time
          ? new Date(`${race.date.toISOString().split('T')[0]}T${race.time}Z`)
          : new Date(race.date)

        return new Weekend({
          ergastId: race.raceId,
          year: race.year,
          round: race.round,
          name: race.name,
          date: {
            full: date,
            time: race.time || '00:00:00',
            exact: !!race.time
          },
          wiki: race.url,
          circuit: circuits.find(c => c.ergastId === race.circuitId)._id,
          // sessions: [
          //   {
          //     key: Weekend.SESSIONS.FP1.key,
          //     name: Weekend.SESSIONS.FP1.name,
          //     date: race.fp1_date,
          //     time: race.fp1_time
          //   }
          // ]
        })
      })
    })
    .then(convertedWeekends => {
      return Weekend.insertMany(convertedWeekends)
    })
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

module.exports = conversion
