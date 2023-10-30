const errorHandler = (err, req, res, next) => {
  console.error(err)

  const {
    statusCode = 500,
    message = 'Internal Server Error'
  } = err

  res.status(statusCode).json({
    error: message
  })
}

module.exports = errorHandler
