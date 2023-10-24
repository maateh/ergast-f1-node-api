const { Schema, model } = require('mongoose')

const raceSchema = new Schema({
  // raceId -> _id
  // number: { - unnecessary
  //   type: Number,
  //   required: true
  // },
  grid: {
    type: Number,
    required: true
  },
  position: {
    type: {
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
    required: true
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
  fastestLap: {
    number: { // <- fastestLap
      type: Number,
      required: false
    },
    rank: { // <- rank
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
  },
  // status: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Status',
  //   required: true
  // },
  weekend: {
    type: Schema.Types.ObjectId,
    ref: 'Weekend',
    required: true
  },
  // driver: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Driver',
  //   required: true
  // },
  // constructor: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Constructor',
  //   required: true
  // }
})

module.exports = model('Race', raceSchema)
