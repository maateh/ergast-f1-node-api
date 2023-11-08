const { Schema } = require('mongoose')

const sprintResultSchema = new Schema({
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
    }
  },
  _id: false
})

sprintResultSchema.methods.simplify = function() {
  return {
    grid: this.grid,
    position: this.position,
    points: this.points,
    laps: this.laps,
    duration: this.duration,
    fastest: this.fastest
  }
}

module.exports = sprintResultSchema
