// services
const filterService = require('../../services/filter/filterService')

// models
const Timing = require('../../models/mongoose/Timing')
const Weekend = require('../../models/mongoose/Weekend')
const WeekendResponse = require('../../models/response/WeekendResponse')
const TimingResponse = require('../../models/response/TimingResponse')

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
      laps: TimingResponse.parseList(timings)
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getTimings
}
