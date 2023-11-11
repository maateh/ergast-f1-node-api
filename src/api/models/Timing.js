const { Schema, model } = require('mongoose')

// models
const { simplifyDriver } = require('./Driver')
const { simplifyTeam } = require('./Team')

const timingSchema = new Schema({
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
  lap: {
    type: Number,
    required: true
  },
  position: {
    type: Number,
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

timingSchema.methods.simplify = function() {
  return simplify(this)
}

function simplify(timing) {
  return {
    lap: timing.lap,
    position: timing.position,
    duration: timing.duration,
    driver: simplifyDriver(timing.driver),
    team: simplifyTeam(timing.team)
  }
}

module.exports = model('Timing', timingSchema)
module.exports.simplifyTiming = simplify
