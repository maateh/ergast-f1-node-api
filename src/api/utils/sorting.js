function sorting(array, keyRefs) {
  return array.sort((a, b) => {
    const keyA = getValueFromKey(a, keyRefs).toLowerCase()
    const keyB = getValueFromKey(b, keyRefs).toLowerCase()

    return keyA < keyB ? -1 : 1
  })
}

function getValueFromKey(object, key) {
  return key.split('.').reduce((object, item) => object[item], object)
}

module.exports = sorting
