const { Schema, model } = require('mongoose')

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

const weekendSchema = new Schema({
  ergastId: { // <- raceId
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  round: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  date: { // <- date, time
    type: {
      full: {
        type: Date,
        required: true
      },
      time: {
        type: String,
        required: true
      },
      exact: {
        type: Boolean,
        required: true,
        default: true
      }
    },
    required: true
  },
  wiki: { // <- url
    type: String,
    required: true
  },
  circuit: {
    type: Schema.Types.ObjectId,
    ref: 'Circuit',
    required: true
  },
  // sessions: [{
  //   key: {
  //     type: String,
  //     required: true
  //   },
  //   name: {
  //     type: String,
  //     required: true
  //   },
  //   date: {
  //     type: Date,
  //     required: true
  //   }
  // }],
  results: {
    qualifying: [{
      type: Schema.Types.ObjectId,
      ref: 'Qualifying'
    }],
    race: [{
      type: Schema.Types.ObjectId,
      ref: 'Race'
    }],
    sprint: [{}]
  },
  pits: [{}],
  laps: [{}]
})

module.exports = model('Weekend', weekendSchema)
