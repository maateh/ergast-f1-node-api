// errors
const RouteNotFoundError = require('../errors/RouteNotFoundError')

const handleUnmatchedRoutes = (req, res, next) => {
  const error = new RouteNotFoundError(req.originalUrl)
  next(error)
}

module.exports = handleUnmatchedRoutes
