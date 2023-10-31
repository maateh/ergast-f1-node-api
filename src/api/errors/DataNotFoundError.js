class DataNotFoundError extends Error {
  constructor(type, statusCode) {
    super(`${type} not found!`)
    this.statusCode = statusCode || 404
  }
}

module.exports = DataNotFoundError
