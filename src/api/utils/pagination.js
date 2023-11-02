// utils
const sorting = require('./sorting')

// Slicing an array for pagination functionality
function pagination(array, limit, offset) {
  return array.slice(offset, offset + limit)
}

// Slicing an array for pagination functionality
// with sorting data automatically
function paginationWithSorting(array, limit, offset, key) {
  const sortedArray = sorting(array, key)
  return pagination(sortedArray, limit, offset)
}

module.exports = { pagination, paginationWithSorting }
