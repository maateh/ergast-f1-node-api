// Remove properties from an object whose value is undefined or null

function objectCleaner(object) {
  const cleanedObject = Object.entries(object)
    .filter(([_, value]) => value !== undefined && value !== null)

  return Object.fromEntries(cleanedObject)
}

module.exports = objectCleaner
