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
  _circuit: {
    type: Schema.Types.ObjectId,
    ref: 'Circuit',
    required: true
  },
  sessions: [sessionSchema],
  _drivers: [{
    type: Schema.Types.ObjectId,
    ref: 'Driver'
  }],
  _constructors: [{
    type: Schema.Types.ObjectId,
    ref: 'Constructor'
  }],
  // results: {
  //   qualifying: [{
  //     type: Schema.Types.ObjectId,
  //     ref: 'Qualifying'
  //   }],
  //   race: [{
  //     type: Schema.Types.ObjectId,
  //     ref: 'Race'
  //   }],
  //   sprint: [{}]
  // },
  // pits: [{}],
  // laps: [{}]
})

module.exports = model('Weekend', weekendSchema)
