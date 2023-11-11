const { Schema, model } = require('mongoose')

// models
const { simplifyDriver } = require('./Driver')
const { simplifyTeam } = require('./Team')

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
  return simplify(this)
}

function simplify(pitStop) {
  return {
    stop: pitStop.stop,
    lap: pitStop.lap,
    timeOfDay: pitStop.timeOfDay,
    duration: pitStop.duration,
    driver: simplifyDriver(pitStop.driver),
    team: simplifyTeam(pitStop.team)
  }
}

module.exports = model('PitStop', pitStopSchema)
module.exports.simplifyPitStop = simplify
