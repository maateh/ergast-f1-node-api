const { Schema, model } = require('mongoose')

const qualifyingResultSchema = new Schema({
  ergastId: { // <- qualifyId
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
  position: {
    type: Number,
    required: true
  },
  q1: {
    type: String,
    required: false
  },
  q2: {
    type: String,
    required: false
  },
  q3: {
    type: String,
    required: false
  }
})

module.exports = model('QualifyingResult', qualifyingResultSchema)
