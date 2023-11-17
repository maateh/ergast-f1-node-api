// models
const CircuitResponse = require('./CircuitResponse')
const SeasonResponse = require('./SeasonResponse')

class WeekendResponse {
  constructor({ season, round, name, circuit, sessions, wiki }) {
    this.season = new SeasonResponse(season._season || season)
    this.round = round
    this.name = name
    this.circuit = new CircuitResponse(circuit._circuit || circuit)
    this.sessions = sessions
    this.wiki = wiki
  }

  static parseList(weekends) {
    return weekends.map(w => new WeekendResponse(w))
  }
}

module.exports = WeekendResponse
