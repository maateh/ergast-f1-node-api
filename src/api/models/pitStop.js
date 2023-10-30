const { Schema, model } = require('mongoose')

const pitStopSchema = new Schema({
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
  stop: {
    type: Number,
    required: true
  },
  lap: {
    type: Number,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  interval: {
    duration: {
      type: String,
      required: true
    },
    ms: { // <- milliseconds
      type: Number,
      required: true
    }
  }
})

module.exports = model('PitStop', pitStopSchema)
