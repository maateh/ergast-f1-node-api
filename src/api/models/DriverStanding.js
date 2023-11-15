const { model, Schema } = require('mongoose')

const standingSchema = require('./schemas/standingSchema')

const driverStandingSchema = new Schema({
  driver: {
    ref: {
      type: String,
      required: true
    },
    _driver: {
      type: Schema.Types.ObjectId,
      ref: 'Driver',
      required: true
    }
  },
  teams: [{
    ref: {
      type: String,
      required: false // TODO: add teams
    },
    _team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: false // TODO: add teams
    }
  }],
  ...standingSchema.obj,
})

module.exports = model('DriverStanding', driverStandingSchema)
