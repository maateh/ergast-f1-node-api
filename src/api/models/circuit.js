const { Schema, model } = require('mongoose')

const circuitSchema = new Schema({
  ergastId: {
    type: Number,
    required: false,
    unique: true
  },
  ref: {
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
  wiki: {
    type: String,
    required: true
  },
})

circuitSchema.methods.simplify = function() {
  return simplify(this)
}

const simplify = circuit => {
  return {
    id: circuit.ref,
    name: circuit.name,
    location: circuit.location,
    wiki: circuit.wiki
  }
}

module.exports = model('Circuit', circuitSchema)
module.exports.simplifyCircuit = simplify
