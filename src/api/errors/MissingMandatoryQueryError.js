class MissingMandatoryQueryError extends Error {
  constructor(mandatoryFields, statusCode) {
    super(`These query params are mandatory for this request: ${mandatoryFields.join(', ')}`)
    this.statusCode = statusCode || 400
  }
}

module.exports = MissingMandatoryQueryError
