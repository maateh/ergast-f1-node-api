const { Schema, model } = require('mongoose')

const seasonSchema = new Schema({
  year: {
    type: Number,
    required: true,
    unique: true
  },
  wiki: { // <- url
    type: String,
    required: true
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

seasonSchema.methods.simplify = function() {
  return {
    year: this.year,
    wiki: this.wiki,
    drivers: this.drivers,
    // drivers: this.drivers.map(d => d._driver.simplify()),
    teams: this.teams
    // teams: this.teams.map(t => t._team.simplify())
  }
}

module.exports = model('Season', seasonSchema)
