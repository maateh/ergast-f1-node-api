const { Schema, model } = require('mongoose')

const seasonSchema = new Schema({
  year: {
    type: Number,
    required: true,
    unique: true
  },
  wiki: { // <- url
    type: String,
    required: true
  }
})

module.exports = model('Season', seasonSchema)
