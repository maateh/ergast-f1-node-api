const { Schema } = require('mongoose')

const raceResultSchema = new Schema({
  grid: {
    type: Number,
    required: true
  },
  position: {
    order: {
      type: Number,
      required: true
    },
    finished: {
      type: Boolean,
      required: true
    },
    info: {
      type: String,
      required: true
    }
  },
  points: {
    type: Number,
    required: true
  },
  laps: {
    type: Number,
    required: true
  },
  duration: {
    gap: {
      type: String,
      required: false
    },
    ms: {
      type: Number,
      required: false
    }
  },
  fastest: {
    rank: {
      type: Number,
      required: false
    },
    lap: {
      type: Number,
      required: false
    },
    time: {
      type: String,
      required: false
    },
    ms: {
      type: Number,
      required: false
    },
    speed: {
      type: Number,
      required: false
    }
  },
  _id: false
})

raceResultSchema.methods.simplify = function() {
  return {
    grid: this.grid,
    position: this.position,
    points: this.points,
    laps: this.laps,
    duration: this.duration,
    fastest: this.fastest
  }
}

module.exports = raceResultSchema
