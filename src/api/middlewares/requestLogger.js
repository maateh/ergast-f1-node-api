const requestLogger = (req, res, next) => {
  const { method, originalUrl } = req

  console.info(`${method} -> ${originalUrl}`)

  next()
}

module.exports = requestLogger
