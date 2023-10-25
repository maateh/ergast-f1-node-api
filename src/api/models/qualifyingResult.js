const { Schema, model } = require('mongoose')

const qualifyingResultSchema = new Schema({
  ergastId: { // <- qualifyId
    type: Number,
    required: true
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
  },
  _weekend: {
    type: Schema.Types.ObjectId,
    ref: 'Weekend',
    required: true
  },
  _driver: {
    type: Schema.Types.ObjectId,
    ref: 'Driver',
    required: true
  },
  _constructor: {
    type: Schema.Types.ObjectId,
    ref: 'Constructor',
    required: true
  }
})

module.exports = model('QualifyingResult', qualifyingResultSchema)
