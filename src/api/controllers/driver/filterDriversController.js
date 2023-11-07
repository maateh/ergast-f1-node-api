// services
const filterWithRegroupResults = require('../../services/filter/filterWithRegroupResults')

// models
const { simplifyDriver } = require('../../models/Driver')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getDriversFilteredByResults = async (req, res, next, resultType) => {
  const { metadata, filter, pagination } = res.locals

  try {
    const { data: drivers, total } = await filterWithRegroupResults(resultType, filter, pagination, {
      targetCollection: 'drivers',
      groupingField: 'driver._driver',
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
  getDriversFilteredByResults
}
