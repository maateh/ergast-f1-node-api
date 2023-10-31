// errors
const RouteNotFoundError = require('../errors/RouteNotFoundError')

const unmatchedRoutesHandler = (req, res, next) => {
  const error = new RouteNotFoundError(req.originalUrl)
  next(error)
}

module.exports = unmatchedRoutesHandler
