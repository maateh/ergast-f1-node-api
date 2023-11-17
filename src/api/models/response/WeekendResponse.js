// models
const CircuitResponse = require('./CircuitResponse')
const SeasonResponse = require('./SeasonResponse')

class WeekendResponse {
  constructor(weekend) {
    this.season = new SeasonResponse(weekend.season._season || weekend.season)
    this.round = weekend.round
    this.name = weekend.name
    this.circuit = new CircuitResponse(weekend.circuit._circuit || weekend.circuit)
    this.sessions = weekend.sessions
    this.wiki = weekend.wiki
  }

  static parseList(weekends) {
    return weekends.map(w => new WeekendResponse(w))
  }
}

module.exports = WeekendResponse
