function mapper(array, key) {
  return array.reduce((map, item) => {
    map.set(item[key], item)
    return map
  }, new Map())
}

module.exports = mapper
