class RouteNotFoundError extends Error {
  constructor(route, statusCode) {
    super("Couldn't find the specified route!")
    this.route = route
    this.statusCode = statusCode || 404
  }
}

module.exports = RouteNotFoundError
