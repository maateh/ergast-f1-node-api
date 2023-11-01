// utils
const sorting = require('./sorting')

function pagination(array, limit, offset) {
  return array.slice(offset, offset + limit)
}

function paginationWithSorting(array, limit, offset, key) {
  const sortedArray = sorting(array, key)
  return pagination(sortedArray, limit, offset)
}

module.exports = { pagination, paginationWithSorting }
