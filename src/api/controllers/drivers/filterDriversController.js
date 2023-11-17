// services
const filterWithRegroupService = require('../../services/filter/filterWithRegroupService')

// models
const Result = require('../../models/mongoose/Result')
const { simplifyDriver } = require('../../models/mongoose/Driver')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getDriversFilteredByResults = async (req, res, next) => {
  const { metadata, filter, pagination } = res.locals

  try {
    const { data: drivers, total } = await filterWithRegroupService(Result, filter.results, pagination, {
      groupingField: 'driver._driver',
      targetCollection: 'drivers',
      sort: { 'name.lastName': 1 },
      requiredFields: {
        ref: 1,
        number: 1,
        code: 1,
        name: 1,
        dateOfBirth: 1,
        nationality: 1,
        wiki: 1
      }
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
