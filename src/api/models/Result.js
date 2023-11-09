const { Schema, model } = require('mongoose')

// models
const { simplifyWeekend } = require('./Weekend')
const { simplifyDriver } = require('./Driver')
const { simplifyTeam } = require('./Team')

// schemas
const raceResultSchema = require('./schemas/raceResultSchema')
const qualifyingResultSchema = require('./schemas/qualifyingResultSchema')
const sprintResultSchema = require('./schemas/sprintResultSchema')

const resultSchema = new Schema({
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
  race: {
    type: raceResultSchema,
    required: true
  },
  qualifying: qualifyingResultSchema,
  sprint: sprintResultSchema
})

resultSchema.methods.simplify = function() {
  return simplify(this)
}

const simplify = result => {
  return {
    weekend: simplifyWeekend(result.weekend),
    driver: simplifyDriver(result.driver),
    team: simplifyTeam(result.team),
    race: result.race,
    qualifying: result.qualifying,
    sprint: result.sprint
  }
}

module.exports = model('Result', resultSchema)
module.exports.simplifyResult = simplify
