// Comparing arrays and filtering common elements
// based on a given key reference

function filterCommonElements(keyRef, arrays) {
  const filterableArrays = arrays.filter(array => array.length)

  return filterableArrays.length
    ? filterableArrays.reduce((commonElements, currentArray) => {
      return commonElements.filter(element => {
        const key = getKeyValueAsString(element, keyRef)

        return currentArray.find(currentElement => {
          return getKeyValueAsString(currentElement, keyRef) === key
        })
      })
    })
    : []
}

function getKeyValueAsString(object, keyRef) {
  return keyRef.split('.')
    .reduce((object, key) => object[key], object)
    .toString()
}

module.exports = filterCommonElements
