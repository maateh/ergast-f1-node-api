class Qualifying {
  constructor({
    qualifyId,
    raceId,
    driverId,
    constructorId,
    number,
    position,
    q1,
    q2,
    q3
  }) {
    this.dbId = qualifyId
    this.raceDbId = raceId
    this.driverDbId = driverId
    this.constructordbId = constructorId
    this.number = number
    this.position = position
    this.sessions = { q1, q2, q3 }
  }
}

module.exports = Qualifying
