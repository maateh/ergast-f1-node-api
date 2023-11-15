const { Schema } = require('mongoose')

const standingSchema = new Schema({
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
  points: {
    type: Number,
    required: true
  },
  position: {
    order: {
      type: Number,
      required: true
    },
    info: {
      type: String,
      required: true
    }
  },
  wins: {
    type: Number,
    required: true
  }
})

module.exports = standingSchema
