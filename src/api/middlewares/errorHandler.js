const errorHandler = (err, req, res, next) => {
  console.error(err.stack)

  const {
    statusCode = 500,
    message = 'Internal Server Error'
  } = err

  res.status(statusCode).json({
    metadata: res.locals.metadata,
    error: { message }
  })
}

module.exports = errorHandler
