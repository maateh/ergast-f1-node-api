const { Schema, model } = require('mongoose')

const circuitSchema = new Schema({
  // circuitId: {
  //   type: Number,
  //   required: true
  // },
  ref: { // circuitRef
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: {
      locality: {
        type: String,
        required: true
      },
      country: {
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
    required: false,
  },
  url: {
    type: String,
    required: true
  },
})

module.exports = model('Circuit', circuitSchema)
