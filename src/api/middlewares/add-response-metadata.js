module.exports = (req, res, next) => {
  res.body = {
    url: req.protocol + '://' + req.headers.host + req.originalUrl,
    route: req.originalUrl,
    limit: req.query.limit,
    offset: req.query.offset
  }
  next()
}
