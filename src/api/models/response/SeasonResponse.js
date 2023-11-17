class SeasonResponse {
  constructor({ year, wiki }) {
    this.year = year
    this.wiki = wiki
  }

  static parseList(seasons) {
    return seasons.map(s => new SeasonResponse(s))
  }
}

module.exports = SeasonResponse
