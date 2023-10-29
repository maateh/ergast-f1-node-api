const responseMetadata = (req, res, next) => {
  res.locals.metadata = {
    url: req.protocol + '://' + req.headers.host + req.originalUrl,
    route: req.originalUrl
  }
  next()
}

module.exports = responseMetadata
