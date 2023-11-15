const { model, Schema } = require('mongoose')

const standingSchema = require('./schemas/standingSchema')

// models
const { simplifyDriver } = require('./Driver')
// const { simplifyTeam } = require('./Team')

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

driverStandingSchema.methods.simplify = function() {
  return simplify(this)
}

function simplify(standing) {
  return {
    points: standing.points,
    position: standing.position,
    wins: standing.wins,
    driver: simplifyDriver(standing.driver),
    // TODO: add this field
    // teams: standing.teams.map(t => simplifyTeam(t))
  }
}

module.exports = model('DriverStanding', driverStandingSchema)
module.exports.simplifyDriverStanding = simplify
