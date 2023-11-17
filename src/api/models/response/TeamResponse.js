class TeamResponse {
  constructor({ ref, name, nationality, wiki }) {
    this.id = ref
    this.name = name
    this.nationality = nationality
    this.wiki = wiki
  }

  static parseList(teams) {
    return teams.map(t => new TeamResponse(t))
  }
}

module.exports = TeamResponse
