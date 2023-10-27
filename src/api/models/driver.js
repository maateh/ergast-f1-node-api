const { Schema, model } = require('mongoose')

const driverSchema = new Schema({
  ergastId: { // <- driverId
    type: Number,
    required: false,
    unique: true
  },
  ref: { // <- driverRef
    type: String,
    required: true,
    unique: true
  },
  number: {
    type: Number,
    required: false
  },
  code: {
    type: String,
    required: false
  },
  name: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    }
  },
  dateOfBirth: { // <- dob
    type: Date,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  wiki: { // <- url
    type: String,
    required: true
  },
  _circuits: [{
    type: Schema.Types.ObjectId,
    ref: 'Circuit'
  }]
})

module.exports = model('Driver', driverSchema)
