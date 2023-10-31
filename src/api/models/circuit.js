const { Schema, model } = require('mongoose')

const circuitSchema = new Schema({
  ergastId: { // <- circuitId
    type: Number,
    required: false,
    unique: true
  },
  ref: { // <- circuitRef
    type: String,
    required: true,
    unique: true
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

circuitSchema.methods.simplify = function() {
  return {
    id: this.ref,
    name: this.name,
    location: this.location,
    wiki: this.wiki
  }
}

module.exports = model('Circuit', circuitSchema)
