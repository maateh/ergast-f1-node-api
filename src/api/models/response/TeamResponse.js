class TeamResponse {
  constructor(team) {
    this.id = team.ref
    this.name = team.name
    this.nationality = team.nationality
    this.wiki = team.wiki
  }

  static parseList(teams) {
    return teams.map(t => new TeamResponse(t))
  }
}

module.exports = TeamResponse
