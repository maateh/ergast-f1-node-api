// models
const { simplifyTiming } = require('../../models/Timing')
const { simplifyWeekend } = require('../../models/Weekend')

// services
const filterTimings = require('../../services/filter/filterTimings')

const getTimings = async (req, res, next) => {
  const { metadata, pagination, filter } = res.locals

  try {
    const { laps, weekend, total } = await filterTimings(filter.laps, pagination, {
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
      laps: laps.map(lap => simplifyTiming(lap))
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getTimings
}
