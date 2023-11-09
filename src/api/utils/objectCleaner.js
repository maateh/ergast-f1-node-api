/**
 * Recursively removes properties with values of undefined or null from an object.
 * @param {Object} object - The object to clean.
 * @returns {Object} A cleaned version of the input object.
 */

function objectCleaner(object) {
  const clean = obj => {
    if (obj === null || typeof obj !== 'object') {
      return obj
    }

    if (Array.isArray(obj)) {
      return obj.map(clean)
    }

    return Object.fromEntries(
      Object.entries(obj)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => [key, clean(value)])
    )
  }

  return clean(object)
}

module.exports = objectCleaner
