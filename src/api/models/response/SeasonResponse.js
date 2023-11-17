class SeasonResponse {
  constructor(season) {
    this.year = season.year
    this.wiki = season.wiki
  }

  static parseList(seasons) {
    return seasons.map(s => new SeasonResponse(s))
  }
}

module.exports = SeasonResponse
