const { Schema, model } = require('mongoose')

const circuitSchema = new Schema({
  ergastId: { // <- circuitId
    type: Number,
    required: true
  },
  ref: { // <- circuitRef
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    country: {
      type: String,
      required: true
    },
    locality: {
      type: String,
      required: true
    },
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    },
    alt: {
      type: Number,
      required: true
    }
  },
  wiki: { // <- url
    type: String,
    required: true
  },
})

module.exports = model('Circuit', circuitSchema)
