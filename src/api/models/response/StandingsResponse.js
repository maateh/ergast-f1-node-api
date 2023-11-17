// models
const WeekendResponse = require('./WeekendResponse')
const DriverResponse = require('./DriverResponse')
const TeamResponse = require('./TeamResponse')

class StandingsResponse {
  constructor({
    driverStandings,
    teamStandings,
    lastWeekend
  }) {
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
    this.driver = standing.driver // TODO: parse this
    // this.driver = new Driver(standing.driver)
    // this.teams = standing.teams // TODO: add this later
    this.position = standing.position
    this.points = standing.points
    this.wins = standing.wins
  }
}

class TeamStandingResponse {
  constructor(standing) {
    this.team = standing.team // TODO: parse this
    // this.team = new Team(standing.team)
    // this.drivers = standing.drivers // TODO: add this later
    this.position = standing.position
    this.points = standing.points
    this.wins = standing.wins
  }
}

module.exports = StandingsResponse
