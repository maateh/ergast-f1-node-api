// errors
const MissingMandatoryQueryError = require('../errors/MissingMandatoryQueryError')

const validateMandatoryQuery = (req, res, next) => {
  const { originalUrl, query } = req

  const mandatoryFields = []
  if (originalUrl.includes('/timings') || originalUrl.includes('/pitstops')) {
    mandatoryFields.push('year')
    mandatoryFields.push('round')
  }

  if (originalUrl.includes('/standings')) {
    mandatoryFields.push('year')
  }

  const queryKeys = Object.keys(query)
  const missing = mandatoryFields.some(field => !queryKeys.includes(field))

  if (missing) {
    const error = new MissingMandatoryQueryError(mandatoryFields)
    next(error)
  }

  next()
}

module.exports = validateMandatoryQuery
