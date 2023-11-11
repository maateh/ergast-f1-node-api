// models
const { simplifyPitStop } = require('../../models/PitStop')
const { simplifyWeekend } = require('../../models/Weekend')

// services
const filterPitStops = require('../../services/filter/filterPitStops')

const getPitStops = async (req, res, next) => {
  const { metadata, pagination, filter } = res.locals

  try {
    const { pitStops, weekend, total } = await filterPitStops(filter.pitStops, pagination, {
      stop: 1,
      lap: 1,
      timeOfDay: 1
    })

    res.json({
      metadata,
      pagination: {
        ...pagination,
        total
      },
      weekend: simplifyWeekend(weekend),
      pitStops: pitStops.map(ps => simplifyPitStop(ps))
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getPitStops
}
