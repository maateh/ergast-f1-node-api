const { Schema, model } = require('mongoose')

const dateSchema = require('./schemas/date')
const sessionSchema = require('./schemas/session')

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
    type: dateSchema,
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
  sessions: [sessionSchema],
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
  laps: [{}],
  drivers: [{}],
  constructors: [{}],
})

module.exports = model('Weekend', weekendSchema)
