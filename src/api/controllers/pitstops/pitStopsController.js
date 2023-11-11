// services
const filterService = require('../../services/filter/filterService')

// models
const PitStop = require('../../models/PitStop')
const { simplifyPitStop } = require('../../models/PitStop')
const { simplifyWeekend } = require('../../models/Weekend')

// errors
const DataNotFoundError = require('../../errors/DataNotFoundError')

const getPitStops = async (req, res, next) => {
  const { metadata, pagination, filter } = res.locals

  try {
    const { data: pitStops, total } = await filterService(PitStop, filter.pitStops, pagination, {
      stop: 1,
      lap: 1,
      timeOfDay: 1
    }, {
      stop: 1,
      lap: 1,
      timeOfDay: 1,
      duration: 1,
      driver: 1,
      team: 1
    }, { driver: true, team: true })

    if (!pitStops || !pitStops.length) {
      throw new DataNotFoundError('PitStops')
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
      pitStops: pitStops.map(ps => simplifyPitStop(ps))
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getPitStops
}
