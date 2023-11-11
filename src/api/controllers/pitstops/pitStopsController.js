// models
const { simplifyPitStop } = require('../../models/PitStop')
const { simplifyWeekend } = require('../../models/Weekend')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

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

    if (!pitStops || !pitStops.length) {
      throw new DataNotFoundError('PitStops')
    }

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
