// models
const Circuit = require('./Circuit')
const Season = require('./Season')

class Weekend {
  constructor(weekend) {
    this.season = new Season(weekend.season._season || weekend.season)
    this.round = weekend.round
    this.name = weekend.name
    this.circuit = new Circuit(weekend.circuit._circuit || weekend.circuit)
    this.sessions = weekend.sessions
    this.wiki = weekend.wiki
  }

  static parseList(weekends) {
    return weekends.map(w => new Weekend(w))
  }
}

module.exports = Weekend
