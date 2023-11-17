// models
const DriverResponse = require('./DriverResponse')
const TeamResponse = require('./TeamResponse')
const WeekendResponse = require('./WeekendResponse')

// TODO: grouping data based on seasons & weekends
class ResultResponse {
  constructor({ race, qualifying, sprint, driver, team, weekend }) {
    this.race = race
    this.qualifying = qualifying
    this.sprint = sprint
    this.driver = new DriverResponse(driver)
    this.team = new TeamResponse(team)
    this.weekend = new WeekendResponse(weekend)
  }

  static parseList(results) {
    return results.map(r => new ResultResponse(r))
  }
}

module.exports = ResultResponse
