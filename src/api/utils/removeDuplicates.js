// Remove duplicate values from an array
// based on the given key references

function removeDuplicates(array, initialKeyRef, targetKeyRef) {
  const targetObject = array.reduce((targetObject, item) => {
    const initialKey = getKeyValueAsString(item, initialKeyRef)
    targetObject[initialKey] = getKeyValue(item, targetKeyRef)

    return targetObject
  }, {})

  return Object.values(targetObject)
}

function getKeyValue(object, keyRef) {
  return keyRef.split('.')
    .reduce((object, key) => object[key], object)
}

function getKeyValueAsString(object, keyRef) {
  return getKeyValue(object, keyRef).toString()
}

module.exports = removeDuplicates
