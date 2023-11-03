const { Schema } = require('mongoose')

const dateSchema = require('./dateSchema')

const SESSIONS = {
  FP1: {
    key: 'fp1',
    name: 'Free Practice 1'
  },
  FP2: {
    key: 'fp2',
    name: 'Free Practice 2'
  },
  FP3: {
    key: 'fp3',
    name: 'Free Practice 3'
  },
  QUALIFYING: {
    key: 'qualifying',
    name: 'Qualifying'
  },
  RACE: {
    key: 'race',
    name: 'Race'
  },
  SPRINT_QUALIFYING: {
    key: 'sprint_qualifying',
    name: 'Sprint Shootout'
  },
  SPRINT_RACE: {
    key: 'sprint_race',
    name: 'Sprint Race'
  },
}

const sessionSchema = new Schema({
  key: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  date: { // <- date, time
    type: dateSchema,
    required: true
  },
})

module.exports = sessionSchema
module.exports.SESSIONS = SESSIONS
