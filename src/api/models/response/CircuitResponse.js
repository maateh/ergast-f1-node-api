class CircuitResponse {
  constructor(circuit) {
    this.id = circuit.ref
    this.name = circuit.name
    this.location = circuit.location
    this.wiki = circuit.wiki
  }

  static parseList(circuits) {
    return circuits.map(c => new CircuitResponse(c))
  }
}

module.exports = CircuitResponse
