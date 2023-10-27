const { Schema, model } = require('mongoose')

const teamSchema = new Schema({
  ergastId: { // <- constructorId
    type: Number,
    required: false,
    unique: true
  },
  ref: { // <- constructorRef
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true
  },
  wiki: { // <- url
    type: String,
    required: true
  }
})

module.exports = model('Team', teamSchema)
