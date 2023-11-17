// models
const DriverResponse = require('./DriverResponse')
const TeamResponse = require('./TeamResponse')

// TODO: grouping data based on laps
class TimingResponse {
  constructor({ lap, position, duration, driver, team }) {
    this.lap = lap
    this.position = position
    this.duration = duration
    this.driver = new DriverResponse(driver)
    this.team = new TeamResponse(team)
  }

  static parseList(timings) {
    return timings.map(t => new TimingResponse(t))
  }
}

module.exports = TimingResponse
