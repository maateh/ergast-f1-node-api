const responseMetadata = (req, res, next) => {
  res.locals.metadata = {
    url: req.protocol + '://' + req.headers.host + req.originalUrl,
    route: req.path,
    query: Object.keys(req.query).length ? req.query : undefined
  }
  next()
}

module.exports = responseMetadata
