const { Schema } = require('mongoose')

const dateSchema = new Schema({ // <- date, time
  full: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  exact: {
    type: Boolean,
    required: true,
    default: true
  },
  _id: false
})

module.exports = dateSchema
