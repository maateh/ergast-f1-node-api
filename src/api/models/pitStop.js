const { Schema, model } = require('mongoose')

const pitStopSchema = new Schema({
  season: {
    year: {
      type: Number,
      required: true
    },
    _season: {
      type: Schema.Types.ObjectId,
      ref: 'Season',
      required: true
    }
  },
  weekend: {
    round: {
      type: Number,
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
  stop: {
    type: Number,
    required: true
  },
  lap: {
    type: Number,
    required: true
  },
  timeOfDay: {
    type: Date,
    required: true
  },
  duration: {
    time: {
      type: String,
      required: true
    },
    ms: {
      type: Number,
      required: true
    }
  }
})

pitStopSchema.methods.simplify = function() {
  return {
    weekend: this.weekend,
    // weekend: this.weekend._weekend.simplify(),
    driver: this.driver,
    // driver: this.driver._driver.simplify(),
    team: this.team,
    // team: this.team._team.simplify(),
    stop: this.stop,
    lap: this.lap,
    timeOfDay: this.timeOfDay,
    duration: this.duration
  }
}

module.exports = model('PitStop', pitStopSchema)
