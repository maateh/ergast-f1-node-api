function mapper(array, key) {
  return array.reduce((map, item) => {
    map.set(item[key], item)
    return map
  }, new Map())
}

// Stores an array for a key not just a single value
function arrayMapper(array, keyRefs) {
  return array.reduce((map, item) => {
    const key = keyRefs.reduce((a, prop) => a[prop], item).toString()
    const values = map.get(key) || []
    map.set(key, [...values, item])

    return map
  }, new Map())
}

module.exports = { mapper, arrayMapper }
