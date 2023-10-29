const responsePagination = (req, res, next) => {
  const maxLimit = 1000

  const { limit = 30, offset = 0 } = req.query
  const fixedLimit = Math.min(limit, maxLimit)

  res.locals.pagination = {
    limit: fixedLimit,
    offset
  }
  next()
}

module.exports = responsePagination
