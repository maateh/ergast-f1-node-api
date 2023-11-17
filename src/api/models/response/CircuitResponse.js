class CircuitResponse {
  constructor({ ref, name, location, wiki }) {
    this.id = ref
    this.name = name
    this.location = location
    this.wiki = wiki
  }

  static parseList(circuits) {
    return circuits.map(c => new CircuitResponse(c))
  }
}

module.exports = CircuitResponse
