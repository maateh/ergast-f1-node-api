const db = require('../database/mysql')

// models
const Weekend = require('../../api/models/mongoose/Weekend')
const Season = require('../../api/models/mongoose/Season')
const Circuit = require('../../api/models/mongoose/Circuit')

// utils
const { arrayToMap } = require('../utils/arrayToMap')

// constants
const { SESSIONS } = require('../../api/models/mongoose/schemas/sessionSchema')

const getAllWeekends = () => {
  const query = 'SELECT * FROM races'

  console.info('Get circuits from the SQL Database...')
  return db.execute(query)
    .then(([races]) => races)
    .catch(err => {
      console.error('Query error: ', err)
    })
}

const conversion = () => {
  console.info('Weekends conversion started...')
  return Promise.all([
    getAllWeekends(),
    Season.find(),
    Circuit.find()
  ])
    .then(([races, seasons, circuits]) => {
      console.info('Converting weekends...')

      const seasonsMap = arrayToMap(seasons, 'year')
      const circuitsMap = arrayToMap(circuits, 'ergastId')

      return races.map(race => {
        const season = seasonsMap[race.year]
        const circuit = circuitsMap[race.circuitId]

        return new Weekend({
          ergastId: race.raceId,
          season: {
            year: race.year,
            _season: season._id
          },
          round: race.round,
          name: race.name,
          wiki: race.url,
          sessions: parseSessions(race),
          circuit: {
            ref: circuit.ref,
            _circuit: circuit._id
          }
        })
      })
    })
    .then(convertedWeekends => {
      console.info('Inserting weekends...')
      return Weekend.insertMany(convertedWeekends)
    })
    .then(() => {
      console.info('Weekends conversion done!')
    })
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

const parseSessions = race => {
  const sessions = []

  if (race.fp1_date) {
    sessions.push({
      key: SESSIONS.FP1.key,
      name: SESSIONS.FP1.name,
      date: parseDate(race.fp1_date, race.fp1_time),
      hasExactTime: !!race.fp1_time
    })
  }

  if (race.fp2_date) {
    sessions.push({
      key: race.sprint_date && race.year >= 2023 ? SESSIONS.SPRINT_QUALIFYING.key : SESSIONS.FP2.key,
      name: race.sprint_date && race.year >= 2023 ? SESSIONS.SPRINT_QUALIFYING.name : SESSIONS.FP2.name,
      date: parseDate(race.fp2_date, race.fp2_time),
      hasExactTime: !!race.fp2_time
    })
  }

  if (race.fp3_date) {
    sessions.push({
      key: SESSIONS.FP3.key,
      name: SESSIONS.FP3.name,
      date: parseDate(race.fp3_date, race.fp3_time),
      hasExactTime: !!race.fp3_time
    })
  }

  if (race.sprint_date) {
    sessions.push({
      key: SESSIONS.SPRINT_RACE.key,
      name: SESSIONS.SPRINT_RACE.name,
      date: parseDate(race.sprint_date, race.sprint_time),
      hasExactTime: !!race.sprint_time
    })
  }

  if (race.quali_date) {
    sessions.push({
      key: SESSIONS.QUALIFYING.key,
      name: SESSIONS.QUALIFYING.name,
      date: parseDate(race.quali_date, race.quali_time),
      hasExactTime: !!race.quali_time
    })
  }

  if (race.date) {
    sessions.push({
      key: SESSIONS.RACE.key,
      name: SESSIONS.RACE.name,
      date: parseDate(race.date, race.time),
      hasExactTime: !!race.time
    })
  }

  return sessions
}

const parseDate = (date, time) => {
  if (time) {
    const dateISO = `${date.toISOString().split('T')[0]}T${time}Z`
    return new Date(dateISO)
  }
  return new Date(date)
}

module.exports = conversion
