const { model, Schema } = require('mongoose')

const standingsSchema = require('./schemas/standingsSchema')

const driverStandingsSchema = new Schema({
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
  ...standingsSchema.obj,
})

module.exports = model('DriverStandings', driverStandingsSchema)
