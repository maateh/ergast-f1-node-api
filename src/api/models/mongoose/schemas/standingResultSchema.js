const { Schema } = require('mongoose')

const standingResultSchema = new Schema({
  ergastId: {
    type: Number,
    required: false,
    // unique: true
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

module.exports = standingResultSchema
