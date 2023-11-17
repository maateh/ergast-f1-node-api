const { Schema } = require('mongoose')

const qualifyingSessionSchema = new Schema({
  time: {
    type: String,
    required: true,
    default: '-'
  },
  ms: {
    type: Number,
    required: false
  },
  _id: false
})

const qualifyingResultSchema = new Schema({
  position: {
    type: Number,
    required: true
  },
  q1: {
    type: qualifyingSessionSchema,
    required: true
  },
  q2: qualifyingSessionSchema,
  q3: qualifyingSessionSchema,
  _id: false
})

module.exports = qualifyingResultSchema
