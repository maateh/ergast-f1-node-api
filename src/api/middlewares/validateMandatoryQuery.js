// errors
const MissingMandatoryQueryError = require('../errors/MissingMandatoryQueryError')

/**
 * Middleware to validate mandatory query parameters based on the request URL.
 * Throws a MissingMandatoryQueryError if parameters are missing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next function to pass control to the next middleware.
 * @throws {MissingMandatoryQueryError} - If mandatory query parameters are missing.
 */

const validateMandatoryQuery = (req, res, next) => {
  const { originalUrl, query } = req

  // Define mandatory query parameters based on the request URL
  const mandatoryFields = []
  if (originalUrl.includes('/timings') || originalUrl.includes('/pitstops')) {
    mandatoryFields.push('year')
    mandatoryFields.push('round')
  }

  if (originalUrl.includes('/standings')) {
    mandatoryFields.push('year')
  }

  // Check for missing mandatory fields in the query parameters
  const queryKeys = Object.keys(query)
  const missing = mandatoryFields.some(field => !queryKeys.includes(field))

  // If mandatory fields are missing, throw an error
  if (missing) {
    const error = new MissingMandatoryQueryError(mandatoryFields)
    next(error)
  }

  next()
}

module.exports = validateMandatoryQuery
