const { Schema, model } = require('mongoose')

const seasonSchema = new Schema({
  year: {
    type: Number,
    required: true
  },
  wiki: { // <- url
    type: String,
    required: true
  },
  drivers: [{}],
  constructors: [{}],
  weekends: [{}]
})

module.exports = model('Season', seasonSchema)
