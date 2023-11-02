const queryValidation = (req, res, next) => {
  const validParams = [
    'racePosition',
    'raceGrid',
    'raceFastest',
    'qualifyingPosition',
    'sprintPosition',
    'sprintGrid'
  ]

  const validatedQuery = Object.keys(req.query).find(param => {
    return validParams.includes(param)
  })

  if (validatedQuery) {
    next('route')
    return
  }
  next()
}

module.exports = queryValidation
