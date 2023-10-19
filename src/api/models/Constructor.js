class Constructor {
  constructor({
    constructorId,
    constructorRef,
    name,
    nationality,
    url
  }) {
    this.dbId = constructorId
    this.id = constructorRef
    this.name = name
    this.nationality = nationality
    this.wiki = url
  }
}

module.exports = Constructor
