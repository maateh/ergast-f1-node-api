const { Schema, model } = require('mongoose')

const driverSchema = new Schema({
  ergastId: { // <- driverId
    type: Number,
    required: true
  },
  ref: { // <- driverRef
    type: String,
    required: true
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
    type: {
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      }
    },
    required: true,
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
  seasons: [{
    year: {
      type: Number,
      required: true
    },
    _season: {
      type: Schema.Types.ObjectId,
      ref: 'Season',
      required: true
    },
    weekends: [{
      round: {
        type: Number,
        required: true
      },
      _weekend: {
        type: Schema.Types.ObjectId,
        ref: 'Weekend',
        required: true
      },
      _constructor: {
        type: Schema.Types.ObjectId,
        ref: 'Constructor',
        required: true
      },
      // _results: [{
      //   type: Schema.Types.ObjectId,
      //   ref: 'Result'
      // }]
    }]
  }],
  _circuits: [{
    type: Schema.Types.ObjectId,
    ref: 'Circuit'
  }]
})

module.exports = model('Driver', driverSchema)
