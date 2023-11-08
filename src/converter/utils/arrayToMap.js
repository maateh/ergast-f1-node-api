// Mapping an array of elements and create an object from it
// where the object key is based on the given key references

function arrayToMap(array, keyRef) {
  return array.reduce((map, item) => {
    const key = getKeyValueAsString(item, keyRef)
    map[key] = item
    return map
  }, {})
}

function arrayToMapWithMultipleKeyRefs(array, keyRefs) {
  return array.reduce((map, item) => {
    const keys = keyRefs.reduce((acc, keyRef) => {
      return acc + getKeyValueAsString(item, keyRef)
    }, '')

    map[keys] = item
    return map
  }, {})
}

function getKeyValueAsString(object, keyRef) {
  return keyRef.split('.')
    .reduce((object, key) => object[key], object)
    .toString()
}

module.exports = {
  arrayToMap,
  arrayToMapWithMultipleKeyRefs
}
