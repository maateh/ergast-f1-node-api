// models
const { simplifyTiming } = require('../../models/Timing')
const { simplifyWeekend } = require('../../models/Weekend')

// services
const filterTimings = require('../../services/filter/filterTimings')

const getTimings = async (req, res, next) => {
  const { metadata, pagination, filter } = res.locals

  try {
    const { timings, weekend, total } = await filterTimings(filter.timings, pagination, {
      lap: 1,
      position: 1
    })

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
