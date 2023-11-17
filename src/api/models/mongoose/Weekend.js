const { Schema, model } = require('mongoose')

// schemas
const sessionSchema = require('./schemas/sessionSchema')

const weekendSchema = new Schema({
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
  round: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  wiki: {
    type: String,
    required: true
  },
  sessions: [sessionSchema],
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
  }
})

module.exports = model('Weekend', weekendSchema)
