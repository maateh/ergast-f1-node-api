const handleErrors = (err, req, res, next) => {
  console.error(err.stack)

  const {
    statusCode = 500,
    message = 'Internal Server Error'
  } = err

  res.status(statusCode).json({
    metadata: res.locals.metadata,
    pagination: res.locals.pagination && {
      ...res.locals.pagination,
      total: 0
    },
    error: { message }
  })
}

module.exports = handleErrors
