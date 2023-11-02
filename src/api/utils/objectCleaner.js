// Remove properties from an object
// whose value is undefined or null

function objectCleaner(object) {
  Object.keys(object).forEach(key => {
    if (object[key] === undefined || object[key] === null) {
      delete object[key]
    }
  })
  return object
}

module.exports = objectCleaner
