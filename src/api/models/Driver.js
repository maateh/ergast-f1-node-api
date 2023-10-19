class Driver {
  constructor({
    driverId,
    driverRef,
    number,
    code,
    forename,
    surname,
    dob,
    nationality,
    url
  }) {
    this.dbId = driverId
    this.id = driverRef
    this.number = number
    this.code = code
    this.givenName = forename
    this.familyName = surname
    this.dateOfBirth = dob
    this.nationality = nationality
    this.wiki = url
  }
}

module.exports = Driver
