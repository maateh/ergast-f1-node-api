const { Schema, model } = require('mongoose')

const raceResultSchema = new Schema({
  ergastId: { // <- resultId
    type: Number,
    required: false,
    unique: true
  },
  weekend: {
    year: {
      type: Number,
      required: true
    },
    round: {
      type: Number,
      required: true
    },
    _season: {
      type: Schema.Types.ObjectId,
      ref: 'Season',
      required: true
    },
    _weekend: {
      type: Schema.Types.ObjectId,
      ref: 'Weekend',
      required: true
    }
  },
  driver: {
    ref: {
      type: String,
      required: true
    },
    _driver: {
      type: Schema.Types.ObjectId,
      ref: 'Driver',
      required: true
    }
  },
  constructor: {
    ref: {
      type: String,
      required: true
    },
    _constructor: {
      type: Schema.Types.ObjectId,
      ref: 'Constructor',
      required: true
    }
  },
  grid: {
    type: Number,
    required: true
  },
  position: {
    number: { // <- position
      type: Number,
      required: false
    },
    text: { // <- positionText
      type: String,
      required: true
    },
    order: { // <- positionOrder
      type: Number,
      required: true
    }
  },
  points: {
    type: Number,
    required: false
  },
  laps: {
    type: String,
    required: false
  },
  duration: {
    gap: { // <- time
      type: String,
      required: false
    },
    ms: { // <- milliseconds
      type: Number,
      required: false
    }
  },
  fastest: {
    rank: { // <- rank
      type: Number,
      required: false
    },
    lap: { // <- fastestLap
      type: Number,
      required: false
    },
    time: { // <- fastestLapTime
      type: String,
      required: false
    },
    speed: { // <- fastestLapSpeed
      type: String,
      required: false
    }
  }
})

module.exports = model('RaceResult', raceResultSchema)
