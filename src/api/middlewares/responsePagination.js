const responsePagination = (req, res, next) => {
  const maxLimit = 1000

  const limit = +req.query.limit || 30
  const offset = +req.query.offset || 0

  const fixedLimit = Math.min(limit, maxLimit)

  res.locals.pagination = {
    limit: fixedLimit,
    offset
  }
  next()
}

module.exports = responsePagination
