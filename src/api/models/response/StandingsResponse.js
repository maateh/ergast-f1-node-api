// models
const WeekendResponse = require('./WeekendResponse')
const DriverResponse = require('./DriverResponse')
const TeamResponse = require('./TeamResponse')

class StandingsResponse {
  constructor({ lastWeekend, driverStandings, teamStandings }) {
    this.lastWeekend = new WeekendResponse(lastWeekend)

    if (driverStandings && driverStandings.length) {
      this.driverStandings = driverStandings.map(dst => {
        return new DriverStandingResponse(dst)
      })
    }

    if (teamStandings && teamStandings.length) {
      this.teamStandings = teamStandings.map(tst => {
        return new TeamStandingResponse(tst)
      })
    }
  }

  static parseList(standings) {
    return standings.map(st => new StandingsResponse(st))
  }
}

class DriverStandingResponse {
  constructor(standing) {
    this.position = standing.position
    this.points = standing.points
    this.wins = standing.wins
    this.driver = new DriverResponse(standing.driver)
    this.teams = TeamResponse.parseList(standing.teams)
  }
}

class TeamStandingResponse {
  constructor(standing) {
    this.position = standing.position
    this.points = standing.points
    this.wins = standing.wins
    this.team = new TeamResponse(standing.team)
    this.drivers = DriverResponse.parseList(standing.drivers)
  }
}

module.exports = StandingsResponse
