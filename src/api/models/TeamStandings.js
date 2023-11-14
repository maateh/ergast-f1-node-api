const { model, Schema } = require('mongoose')

const standingsSchema = require('./schemas/standingsSchema')

const teamStandingsSchema = new Schema({
  team: {
    ref: {
      type: String,
      required: true
    },
    _team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true
    }
  },
  drivers: [{
    ref: {
      type: String,
      required: false // TODO: add drivers
    },
    _driver: {
      type: Schema.Types.ObjectId,
      ref: 'Driver',
      required: false // TODO: add drivers
    }
  }],
  ...standingsSchema.obj,
})

module.exports = model('TeamStandings', teamStandingsSchema)
