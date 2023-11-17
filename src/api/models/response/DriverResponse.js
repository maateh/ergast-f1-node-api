class DriverResponse {
  constructor({
    ref,
    number,
    code,
    name,
    dateOfBirth,
    nationality,
    wiki
  }) {
    this.id = ref
    this.number = number
    this.code = code
    this.name = name
    this.dateOfBirth = dateOfBirth
    this.nationality = nationality
    this.wiki = wiki
  }

  static parseList(drivers) {
    return drivers.map(d => new DriverResponse(d))
  }
}

module.exports = DriverResponse
