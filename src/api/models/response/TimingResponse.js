// models
const DriverResponse = require('./DriverResponse')
const TeamResponse = require('./TeamResponse')

class TimingResponse {
  constructor({ lap, position, duration, driver, team }) {
    this.position = position
    this.duration = duration
    this.driver = new DriverResponse(driver)
    this.team = new TeamResponse(team)
  }

  static parseList(timings) {
    return timings.reduce((laps, timing) => {
      const lapIndex = laps.length - 1
      const prevLap = laps.length ? laps[lapIndex].lap : 0

      const t = new TimingResponse(timing)
      if (prevLap === timing.lap) {
        laps[lapIndex].timings.push(t)
      } else {
        laps.push({ lap: timing.lap, timings: [t] })
      }

      return laps
    }, [])
  }
}

module.exports = TimingResponse
