class Season {
  constructor(season) {
    this.year = season.year
    this.wiki = season.wiki
  }

  static parseList(seasons) {
    return seasons.map(s => new Season(s))
  }
}

module.exports = Season
