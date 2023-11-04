// utils
const sorting = require('./sorting')

// Slice an array for pagination functionality
function pagination(array, pagination) {
  const { limit, offset } = pagination
  return array.slice(offset, offset + limit)
}

// Slice an array for pagination functionality
// with sorting data automatically
function paginationWithSorting(array, limit, offset, key) {
  const sortedArray = sorting(array, key)
  return pagination(sortedArray, limit, offset)
}

module.exports = { pagination, paginationWithSorting }
