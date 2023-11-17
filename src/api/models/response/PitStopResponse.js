// models
const DriverResponse = require('./DriverResponse')
const TeamResponse = require('./TeamResponse')

class PitStopResponse {
  constructor({ stop, lap, timeOfDay, duration, driver, team }) {
    this.stop = stop
    this.lap = lap
    this.timeOfDay = timeOfDay
    this.duration = duration
    this.driver = new DriverResponse(driver)
    this.team = new TeamResponse(team)
  }

  static parseList(pitStops) {
    return pitStops.map(ps => new PitStopResponse(ps))
  }
}

module.exports = PitStopResponse
