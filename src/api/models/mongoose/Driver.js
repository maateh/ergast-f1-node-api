const { Schema, model } = require('mongoose')

const driverSchema = new Schema({
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
  dateOfBirth: {
    type: Date,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  wiki: {
    type: String,
    required: true
  }
})

driverSchema.methods.simplify = function() {
  return simplify(this)
}

const simplify = driver => {
  return {
    id: driver.ref,
    number: driver.number,
    code: driver.code,
    name: driver.name,
    dateOfBirth: driver.dateOfBirth,
    nationality: driver.nationality,
    wiki: driver.wiki
  }
}

module.exports = model('Driver', driverSchema)
module.exports.simplifyDriver = simplify
