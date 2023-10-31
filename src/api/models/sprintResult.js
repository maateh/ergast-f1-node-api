const { Schema, model } = require('mongoose')

const sprintResultSchema = new Schema({
  ergastId: { // <- sprintResultId
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
  team: {
    ref: {
      type: String,
      required: true
    },
    _team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
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
    lap: { // <- fastestLap
      type: Number,
      required: false
    },
    time: { // <- fastestLapTime
      type: String,
      required: false
    }
  }
})

sprintResultSchema.methods.simplify = function() {
  return {
    weekend: this.weekend,
    // weekend: this.weekend._weekend.simplify(),
    driver: this.driver,
    // driver: this.driver._driver.simplify(),
    team: this.team,
    // team: this.team._team.simplify(),
    grid: this.grid,
    position: this.position,
    points: this.points,
    laps: this.laps,
    duration: this.duration,
    fastest: this.fastest
  }
}

module.exports = model('SprintResult', sprintResultSchema)
