// services
const filterTimings = require('../../services/filter/filterTimings')

// models
const { simplifyTiming } = require('../../models/Timing')
const { simplifyWeekend } = require('../../models/Weekend')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getTimings = async (req, res, next) => {
  const { metadata, pagination, filter } = res.locals

  try {
    const { timings, weekend, total } = await filterTimings(filter.timings, pagination, {
      lap: 1,
      position: 1
    })

    if (!timings || !timings.length) {
      throw new DataNotFoundError('Timings')
    }

    res.json({
      metadata,
      pagination: {
        ...pagination,
        total
      },
      weekend: simplifyWeekend(weekend),
      timings: timings.map(t => simplifyTiming(t))
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getTimings
}
