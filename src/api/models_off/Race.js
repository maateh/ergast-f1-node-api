// TODO: rename Race to Weekend
class Race {
  constructor({
    raceId,
    year,
    round,
    circuitId,
    name,
    date,
    time,
    url
    // fp1_date,
    // fp1_time,
    // fp2_date,
    // fp2_time,
    // fp3_date,
    // fp3_time,
    // quali_date,
    // quali_time,
    // sprint_date,
    // sprint_time
  }) {
    this.dbId = raceId
    this.year = year
    this.round = round
    this.circuit = circuitId // TODO: get circuit
    this.name = name
    this.date = date // TODO: create a Date model
    this.time = time // TODO: create a Date model
    this.wiki = url
    // TODO: create a Session model
  }
}

module.exports = Race
