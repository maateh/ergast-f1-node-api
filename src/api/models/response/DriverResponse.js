class DriverResponse {
  constructor(driver) {
    this.id = driver.ref
    this.number = driver.number
    this.code = driver.code
    this.name = driver.name
    this.dateOfBirth = driver.dateOfBirth
    this.nationality = driver.nationality
    this.wiki = driver.wiki
  }

  static parseList(drivers) {
    return drivers.map(d => new DriverResponse(d))
  }
}

module.exports = DriverResponse
