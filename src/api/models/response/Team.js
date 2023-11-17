class Team {
  constructor(team) {
    this.id = team.ref
    this.name = team.name
    this.nationality = team.nationality
    this.wiki = team.wiki
  }

  static parseList(teams) {
    return teams.map(t => new Team(t))
  }
}

module.exports = Team
