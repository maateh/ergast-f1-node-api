// services
const filterWithPopulateResults = require('../../services/filterWithPopulateResults')

// models
const { simplifyDriver } = require('../../models/Driver')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getPopulatedDriversFilteredByResults = async (req, res, next, resultType) => {
  const { metadata, filter, pagination } = res.locals

  try {
    const { data: drivers, total } = await filterWithPopulateResults(resultType, filter, pagination, {
      targetCollection: 'drivers',
      populatingField: 'driver._driver',
      sort: { 'name.lastName': 1 }
    })

    if (!drivers || !drivers.length) {
      throw new DataNotFoundError('Drivers')
    }

    res.json({
      metadata,
      pagination: {
        ...pagination,
        total
      },
      drivers: drivers.map(d => simplifyDriver(d))
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getPopulatedDriversFilteredByResults
}
