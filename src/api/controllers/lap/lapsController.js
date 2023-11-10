// models
const { simplifyLapTime } = require('../../models/LapTime')
const { simplifyWeekend } = require('../../models/Weekend')

// services
const filterLaps = require('../../services/filter/filterLaps')

const getLaps = async (req, res, next) => {
  const { metadata, pagination, filter } = res.locals

  try {
    const { laps, weekend, total } = await filterLaps(filter.laps, pagination, {
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
      laps: laps.map(lap => simplifyLapTime(lap))
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getLaps
}
