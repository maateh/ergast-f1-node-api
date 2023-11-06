const queryValidation = (req, res, next) => {
  const validParams = [
    'year',
    'round'
  ]

  const validatedQuery = Object.keys(req.query)
    .find(param => validParams.includes(param))

  if (validatedQuery) {
    next('route')
    return
  }
  next()
}

module.exports = queryValidation
