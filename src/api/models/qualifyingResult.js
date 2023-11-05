const { Schema, model } = require('mongoose')

const qualifyingSessionSchema = new Schema({
  time: {
    type: String,
    required: true,
    default: '-'
  },
  ms: {
    type: Number,
    required: false
  },
  _id: false
})

const qualifyingResultSchema = new Schema({
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
  position: {
    type: Number,
    required: true
  },
  q1: {
    type: qualifyingSessionSchema,
    required: true
  },
  q2: qualifyingSessionSchema,
  q3: qualifyingSessionSchema
})

qualifyingResultSchema.methods.simplify = function() {
  return {
    weekend: this.weekend,
    // weekend: this.weekend._weekend.simplify(),
    driver: this.driver,
    // driver: this.driver._driver.simplify(),
    team: this.team,
    // team: this.team._team.simplify(),
    position: this.position,
    q1: this.q1,
    q2: this.q2,
    q3: this.q3
  }
}

module.exports = model('QualifyingResult', qualifyingResultSchema)
