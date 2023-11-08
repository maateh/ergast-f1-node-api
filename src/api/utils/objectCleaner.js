// Remove properties from an object whose value is undefined or null

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
