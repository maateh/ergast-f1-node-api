// models
const DriverResponse = require('./DriverResponse')
const TeamResponse = require('./TeamResponse')
const WeekendResponse = require('./WeekendResponse')

class ResultResponse {
  constructor({ race, qualifying, sprint, driver, team, weekend }) {
    this.race = race
    this.qualifying = qualifying
    this.sprint = sprint
    this.driver = new DriverResponse(driver)
    this.team = new TeamResponse(team)
    // this.weekend = new WeekendResponse(weekend)
  }

  static parseList(results) {
    return results.reduce((weekends, result) => {
      const weekendIndex = weekends.length - 1
      const prevWeekend = weekends.length ? weekends[weekendIndex].weekend : null

      const r = new ResultResponse(result)
      if (
        prevWeekend &&
        prevWeekend.season.year === result.weekend.season.year &&
        prevWeekend.round === result.weekend.round
      ) {
        weekends[weekendIndex].results.push(r)
      } else {
        const weekend = new WeekendResponse(result.weekend)
        weekends.push({ weekend, results: [r] })
      }

      return weekends
    }, [])
  }
}

module.exports = ResultResponse
