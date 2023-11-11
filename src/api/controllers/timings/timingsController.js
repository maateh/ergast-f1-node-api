// services
const filterService = require('../../services/filter/filterService')

// models
const Timing = require('../../models/Timing')
const { simplifyTiming } = require('../../models/Timing')
const { simplifyWeekend } = require('../../models/Weekend')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getTimings = async (req, res, next) => {
  const { metadata, pagination, filter } = res.locals

  try {
    const { data: timings, total } = await filterService(Timing, filter.timings, pagination, {
      lap: 1,
      position: 1
    }, {
      lap: 1,
      position: 1,
      duration: 1,
      driver: 1,
      team: 1
    }, { driver: true, team: true }, true)

    if (!timings || !timings.length) {
      throw new DataNotFoundError('Timings')
    }

    // TODO: query weekend
    const weekend = {}

    res.json({
      metadata,
      pagination: {
        ...pagination,
        total
      },
      weekend,
      // weekend: simplifyWeekend(weekend),
      timings: timings.map(t => simplifyTiming(t))
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getTimings
}
