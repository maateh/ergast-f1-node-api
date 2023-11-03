const { Schema, model } = require('mongoose')

const dateSchema = require('./schemas/dateSchema')
const sessionSchema = require('./schemas/sessionSchema')

const weekendSchema = new Schema({
  ergastId: { // <- raceId
    type: Number,
    required: false,
    unique: true
  },
  season: {
    year: {
      type: Number,
      required: true
    },
    _season: {
      type: Schema.Types.ObjectId,
      required: true
    }
  },
  round: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  date: { // <- date, time
    type: dateSchema,
    required: true
  },
  wiki: { // <- url
    type: String,
    required: true
  },
  sessions: [sessionSchema],
  circuit: {
    ref: {
      type: String,
      required: true
    },
    _circuit: {
      type: Schema.Types.ObjectId,
      ref: 'Circuit',
      required: true
    }
  },
  // drivers: [{
  //   ref: {
  //     type: String,
  //     required: true
  //   },
  //   _driver: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Driver',
  //     required: true
  //   }
  // }],
  // teams: [{
  //   ref: {
  //     type: String,
  //     required: true
  //   },
  //   _team: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Team',
  //     required: true
  //   }
  // }]
})

weekendSchema.methods.simplify = function() {
  return {
    // season: this._season, // TODO: this will be modified
    // year: this.year, // TODO: this will be modified
    round: this.round,
    name: this.name,
    date: this.date,
    wiki: this.wiki,
    sessions: this.sessions,
    circuit: this.circuit,
    // circuit: this.circuit._circuit.simplify(),
    drivers: this.drivers,
    // drivers: this.drivers.map(d => d._driver.simplify()),
    teams: this.teams
    // teams: this.teams.map(t => t._team.simplify())
  }
}

module.exports = model('Weekend', weekendSchema)
