// services
const filterService = require('../../services/filter/filterService')

// models
const PitStop = require('../../models/mongoose/PitStop')
const Weekend = require('../../models/mongoose/Weekend')
const WeekendResponse = require('../../models/response/WeekendResponse')
const PitStopResponse = require('../../models/response/PitStopResponse')

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

    const weekend = await Weekend.findOne({
      'season.year': filter.timings['season.year'],
      round: filter.timings['weekend.round']
    }).populate('season._season circuit._circuit')

    if (!weekend) {
      throw new DataNotFoundError('Weekend')
    }

    res.json({
      metadata,
      pagination: {
        ...pagination,
        total
      },
      weekend: new WeekendResponse(weekend),
      pitStops: PitStopResponse.parseList(pitStops)
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getPitStops
}
