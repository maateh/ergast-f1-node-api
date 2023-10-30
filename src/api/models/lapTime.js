const { Schema, model } = require('mongoose')

const lapTimeSchema = new Schema({
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
    ms: { // <- milliseconds
      type: Number,
      required: true
    }
  }
})

module.exports = model('LapTime', lapTimeSchema)
