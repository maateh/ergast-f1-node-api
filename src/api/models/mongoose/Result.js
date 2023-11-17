const { Schema, model } = require('mongoose')

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

module.exports = model('Result', resultSchema)
