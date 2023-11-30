const requestLogger = (req, res, next) => {
  const { method, path } = req

  console.info(`${method} -> ${path}`)

  next()
}

module.exports = requestLogger
