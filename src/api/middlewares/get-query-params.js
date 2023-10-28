module.exports = (req, res, next) => {
  req.query.limit = req.query.limit || 30
  req.query.offset = req.query.offset || 0
  next()
}
