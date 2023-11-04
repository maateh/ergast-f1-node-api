const queryFilterParser = (req, res, next) => {
  res.locals.queryFilter = {}

  Object.entries(req.query)
    .forEach(([key, value]) => {
      res.locals.queryFilter = {
        ...res.locals.queryFilter,
        [key]: parseInt(value)
      }
    })

  next()
}

module.exports = queryFilterParser
