class Circuit {
  constructor({
    circuitId,
    circuitRef,
    name,
    location,
    country,
    lat,
    lng,
    alt,
    url
  }) {
    this.dbId = circuitId
    this.id = circuitRef
    this.name = name
    this.Location = {
      country,
      locality: location,
      lat,
      lng
    }
    this.wiki = url
  }
}

module.exports = Circuit
