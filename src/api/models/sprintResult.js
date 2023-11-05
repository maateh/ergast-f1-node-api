const { Schema, model } = require('mongoose')

const sprintResultSchema = new Schema({
  ergastId: {
    type: Number,
    required: false,
    unique: true
  },
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
