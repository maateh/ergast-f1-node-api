const { Schema, model } = require('mongoose')

const dateSchema = require('./schemas/date')
const sessionSchema = require('./schemas/session')

const weekendSchema = new Schema({
  ergastId: { // <- raceId
    type: Number,
    required: false,
    unique: true
  },
  _season: {
    type: Schema.Types.ObjectId,
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
    type: dateSchema,
    required: true
  },
  wiki: { // <- url
    type: String,
    required: true
  },
  sessions: [sessionSchema],
  circuit: {
    ref: {
      type: String,
      required: true
    },
    _circuit: {
      type: Schema.Types.ObjectId,
      ref: 'Circuit',
      required: true
    }
  },
  drivers: [{
    ref: {
      type: String,
      required: true
    },
    _driver: {
      type: Schema.Types.ObjectId,
      ref: 'Driver',
      required: true
    }
  }],
  teams: [{
    ref: {
      type: String,
      required: true
    },
    _team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true
    }
  }],
  // pits: [{}],
  // laps: [{}]
})

module.exports = model('Weekend', weekendSchema)
