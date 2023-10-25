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
  // TODO
  // team: {
  //   last: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Constructor',
  //   },
  //   history: {
  //     type: [{
  //       type: Schema.Types.ObjectId,
  //       ref: 'Constructor'
  //     }]
  //   }
  // }
})

module.exports = model('Driver', driverSchema)
