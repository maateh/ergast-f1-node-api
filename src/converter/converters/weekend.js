const db = require('../database/mysql')

// models
const Weekend = require('../../api/models/weekend')
const Circuit = require('../../api/models/circuit')
const RaceResult = require('../../api/models/raceResult')

// constants
const { SESSIONS } = require('../../api/models/schemas/session')

const getAllWeekends = () => {
  const query = 'SELECT * FROM races'

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
    Circuit.find()
  ])
    .then(([races, circuits]) => {
      return races.map(race => {
        return new Weekend({
          ergastId: race.raceId,
          year: race.year,
          round: race.round,
          name: race.name,
          date: {
            full: race.time
              ? new Date(`${race.date.toISOString().split('T')[0]}T${race.time}Z`)
              : new Date(race.date),
            time: race.time || '00:00:00',
            exact: !!race.time
          },
          wiki: race.url,
          sessions: parseSessions(race),
          _circuit: circuits.find(c => c.ergastId === race.circuitId)._id
        })
      })
    })
    .then(convertedWeekends => {
      return Weekend.insertMany(convertedWeekends)
    })
    .then(() => {
      console.info('Weekends conversion done!')
    })
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

const createAssociations = () => {
  console.info('Creating associations to the Weekend model...')

  return Promise.all([
    Weekend.find(),
    RaceResult.find().populate(['_driver', '_constructor']),
  ])
    .then(([weekends, results]) => {
      return weekends.map(weekend => {
        const weekendResults = results.filter(r => r._weekend.equals(weekend._id))

        const drivers = new Set(weekendResults.map(r => r._driver._id))
        const constructors = new Set(weekendResults.map(r => r._constructor._id))

        weekend._drivers = Array.from(drivers)
        weekend._constructors = Array.from(constructors)
        // weekend.results = {
        //   race: weekendResults
        // }
        return weekend
      })
    })
    .then(updatedWeekends => Weekend.bulkSave(updatedWeekends))
    .then(() => {
      console.info('Associations is created successfully for the Weekend model!')
    })
    .catch(err => {
      console.error('Association creation error: ', err)
    })
}

const parseSessions = race => {
  const sessions = []

  if (race.fp1_date) {
    sessions.push({
      key: SESSIONS.FP1.key,
      name: SESSIONS.FP1.name,
      date: {
        full: race.fp1_time
          ? new Date(`${race.fp1_date.toISOString().split('T')[0]}T${race.fp1_time}Z`)
          : new Date(race.fp1_date),
        time: race.fp1_time || '00:00:00',
        exact: !!race.fp1_time
      }
    })
  }

  if (race.fp2_date) {
    sessions.push({
      key: race.sprint_date && race.year >= 2023 ? SESSIONS.SPRINT_QUALIFYING.key : SESSIONS.FP2.key,
      name: race.sprint_date && race.year >= 2023 ? SESSIONS.SPRINT_QUALIFYING.name : SESSIONS.FP2.name,
      date: {
        full: race.fp2_time
          ? new Date(`${race.fp2_date.toISOString().split('T')[0]}T${race.fp2_time}Z`)
          : new Date(race.fp2_date),
        time: race.fp2_time || '00:00:00',
        exact: !!race.fp2_time
      }
    })
  }

  if (race.fp3_date) {
    sessions.push({
      key: SESSIONS.FP3.key,
      name: SESSIONS.FP3.name,
      date: {
        full: race.fp3_time
          ? new Date(`${race.fp3_date.toISOString().split('T')[0]}T${race.fp3_time}Z`)
          : new Date(race.fp3_date),
        time: race.fp3_time || '00:00:00',
        exact: !!race.fp3_time
      }
    })
  }

  if (race.sprint_date) {
    sessions.push({
      key: SESSIONS.SPRINT_RACE.key,
      name: SESSIONS.SPRINT_RACE.name,
      date: {
        full: race.sprint_time
          ? new Date(`${race.sprint_date.toISOString().split('T')[0]}T${race.sprint_time}Z`)
          : new Date(race.sprint_date),
        time: race.sprint_time || '00:00:00',
        exact: !!race.sprint_time
      }
    })
  }

  if (race.quali_date) {
    sessions.push({
      key: SESSIONS.QUALIFYING.key,
      name: SESSIONS.QUALIFYING.name,
      date: {
        full: race.quali_time
          ? new Date(`${race.quali_date.toISOString().split('T')[0]}T${race.quali_time}Z`)
          : new Date(race.quali_date),
        time: race.quali_time || '00:00:00',
        exact: !!race.quali_time
      }
    })
  }

  if (race.date) {
    sessions.push({
      key: SESSIONS.RACE.key,
      name: SESSIONS.RACE.name,
      date: {
        full: race.time
          ? new Date(`${race.date.toISOString().split('T')[0]}T${race.time}Z`)
          : new Date(race.date),
        time: race.time || '00:00:00',
        exact: !!race.time
      }
    })
  }

  return sessions
}

module.exports = conversion
module.exports.createWeekendAssociations = createAssociations
